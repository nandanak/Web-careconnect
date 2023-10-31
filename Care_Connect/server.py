from flask import *
import requests
import database_helper
import bcrypt
from email_validator import validate_email, EmailNotValidError
import math
from random import random
from flask_mail import Mail, Message
from config import app, mail
import config
from mailbox import Message

payload={}
headers = {}


@app.route('/', methods=['GET']) # Index page
def root():
    return render_template("index.html"), 200

@app.route('/get_nearby_hospitals', methods=['GET'])
def get_nearby_hospitals():
    data = request.headers['data']
    if data==None:
        return "", 400
    else:
        radius="10000"
        textdata = []
        data = data.strip("\"")
        url = config.geocodeurl+data+"&key="+config.apikey
        response = requests.request("GET", url, headers=headers, data=payload)
        res=json.loads(response.text)
        for j in res["results"]:
            geo = j["geometry"]
            lat = j["geometry"]["location"]["lat"]
            lng = j["geometry"]["location"]["lng"]
            place = j["place_id"]
            url = config.searchurl+str(lat)+"%2C"+str(lng)+"&radius="+radius+"&type=hospital&key="+config.apikey
            response = requests.request("GET", url, headers=headers, data=payload)
            res = json.loads(response.text)
            n = len(res["results"])
            for _ in res["results"]:
                pid = _["place_id"]
                url = config.placeurl+pid+"&key="+config.apikey
                response = requests.request("GET", url, headers=headers, data=payload)
                resp = json.loads(response.text)
                resp = resp["result"]
                if 'name' not in resp:
                    name = None
                else:
                    name = resp["name"]
                if 'formatted_address' not in resp:
                    address = None
                else:
                    address = resp["formatted_address"]
                if 'plus_code' not in resp:
                    pluscode = None
                else:
                    pluscode = resp["plus_code"]["global_code"]
                if 'geometry' not in resp:
                    lat = None
                    lng = None
                else:
                    lat = resp["geometry"]["location"]["lat"]
                    lng = resp["geometry"]["location"]["lng"]
                if 'formatted_phone_number' not in resp:
                    phone = None
                else:
                    phone = resp["formatted_phone_number"]
                if 'website' not in resp:
                    website = None
                else:
                    website = resp["website"]
                if 'rating' not in resp:
                    rating = None
                else:
                    rating = resp["rating"]
                url = config.distanceurl+place+"&destinations=place_id:"+pid+"&key="+config.apikey
                response = requests.request("GET", url, headers=headers, data=payload)
                newres = json.loads(response.text)
                dist = newres["rows"][0]["elements"][0]["distance"]["text"]
                dur = newres["rows"][0]["elements"][0]["duration"]["text"]
                space = "@#thisisspace$%"
                textdata.append(name+space+str(lat)+space+str(lng)+space+address+space+dist+space+dur+space+pid+space+place)
                result = database_helper.hospital_exist(pid)
                if not result:
                    res = database_helper.store_hospdata(pid, name, address, pluscode, lat, lng, phone, website, rating)
                    if res:
                        print("Database updated")
                    else:
                        print("Can't update database")
        return jsonify({'data': textdata}), 200

@app.route('/get_hospital_details', methods=['GET'])
def get_hospital_details():
    data = request.headers['data']
    if data==None:
        return "", 400
    else:
        data = data.strip("\"")
        data = database_helper.get_hospdata(data)
        return jsonify({'data': data}), 200

@app.route('/get_all_hospitals', methods=['GET'])
def get_all_hospitals():
    data = database_helper.get_allhospdata()
    return jsonify({'data': data}), 200

@app.route('/get_all_departments', methods=['GET'])
def get_all_departments():
    data = database_helper.get_alldeptdata()
    return jsonify({'data': data}), 200

@app.route('/get_all_doctors', methods=['GET'])
def get_all_doctors():
    data = database_helper.get_alldoctdata()
    return jsonify({'data': data}), 200

@app.route('/check_login', methods=['GET'])
def check_login():
    data = request.headers['data'] # Get the data in json
    if data==None:
        return "", 400 # Incorrect fields in the JSON file
    else:
        data = data.strip("}")
        data = data.split(":")
        token = data[1]
        token = token.strip("\"")
        if token == "null":
            return "", 401 # Incorrect parameters
        else:
            check=database_helper.check_loginfromtoken(token) # Check if user is already signed in
            if check!=None:
                return "", 200
            else:
                return "", 401
    return "", 401

@app.route('/send_mail', methods=['POST'])
def send_mail(): # This function is used to send the password reset link to the user's email
    data = request.get_json() # Get the data in json
    if 'hospital' not in data or 'department' not in data or 'doctor' not in data or 'name' not in data or 'email' not in data or 'datetime' not in data or 'token' not in data:
        return "", 400 # Incorrect fields in the JSON file
    else:
        hospital=data['hospital']
        department=data['department']
        doctor=data['doctor']
        name=data['name']
        email=data['email']
        datetime=data['datetime']
        token=data['token']
        if hospital == "" or department == "" or doctor == "" or name == "" or email == "" or datetime == "" or token == "":
            return "", 400 # Incorrect parameters
        else:
            email = email.strip("\"")
            try:
                validation = validate_email(email) # Validates the email
                email = validation.email
            except EmailNotValidError as e:
                print(str(e))
                return "", 400 # Incorrect email field
            check=database_helper.check_loginfromtoken(token) # Check if user is already signed in
            if check!=None:
                msg = Message( 
                'Hello '+ name, 
                sender ='withtests123@gmail.com', 
                recipients = [email] 
               ) 
                msg.body = 'Hello '+name+', this mail is to confirm your appointment on Care Connect, at '+hospital+' in '+department+' with '+doctor+' on '+datetime+'. Kindly reach on time.'; 
                mail.send(msg) 
                return "", 200
            return "", 401
        return "", 400
    return "", 400
    
                    

@app.route('/sign_in', methods=['POST'])
def sign_in(): # This function is used to sign the user in and create the authentication token
    data = request.get_json() 
    if 'email' not in data or 'password' not in data:
        return "", 400 # Incorrect fields in the JSON file
    else:
        email=data['email'] # Retrieve variables from json 
        pswd=data['password']
        if email == "" or pswd == "":
            return "", 400 # Incorrect parameters
        else:
            try:
                validation = validate_email(email) # Email validation
                email = validation.email
            except EmailNotValidError as e:
                return "", 400 # Incorrect email field   
            userdata=database_helper.get_userdata(email) # Retrive userdata from database
            if userdata!=None:                
                password=pswd.encode('utf-8')
                userpass=userdata[3]
                result=bcrypt.checkpw(password,userpass) # Check hashed passwords match
                if result==False:
                    return "", 401 # Wrong password
                else:
                    letters = 'abcdefghiklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
                    token = ''
                    for i in range(0,36):
                        token += letters[math.floor(random() * len(letters))] # To create new token
                    result = database_helper.store_login(token,email)
                    return jsonify({'data': token}), 201 # Successfully signed in, Token created
            else:
                return "", 404 # User does not exist

@app.route('/sign_up', methods=['POST'])
def sign_up(): # This fucntion is used for user signup
    data = request.get_json()
    if 'email' not in data or 'password' not in data or 'phone' not in data or 'confirm' not in data or 'username' not in data:
        return "", 400 # Incorrect fields in the JSON file
    else:
        email=data['email'] # Retrieve variables from json
        username=data['username']
        phone=data['phone']
        password=data['password']
        confirm=data['confirm']
        if email == "" or username =="" or phone == "" or password == "" or confirm == "":
            return "", 400 # Incorrect parameters
        else:
            try:
                validation = validate_email(email) # Email validation
                email = validation.email
            except EmailNotValidError as e:
                return "", 400 # Incorrect email field
            userdata=database_helper.get_userdata(email) # Get user's data
            if userdata==None:
                if len(password)>=6:
                    if password==confirm:
                        password=password.encode('utf-8')
                        userpass = bcrypt.hashpw(password, bcrypt.gensalt(10)) # Salting and hashing password
                        result = database_helper.store_userdata(email, username, phone, userpass) # Store the data to database
                        return "", 201 # Successfully created a new user
                    else:
                        return "", 401 # Passwords do not match
                else:
                    return "", 406 # Password is too short
            else:
                return "", 409 # User already exists

@app.route('/change_password', methods=['PUT'])
def change_password():
    data = request.get_json()
    token = request.headers['Authorization']
    if 'oldpassword' not in data or 'newpassword' not in data or token==None:
        return "", 400 # Incorrect fields in the JSON file or no token received
    else:
        oldpassword = data['oldpassword']
        newpassword = data['newpassword']
        check=database_helper.check_loginfromtoken(token)
        if check!=None:
            oldpassword = oldpassword.encode("utf-8")
            email=check[0]
            userpass=database_helper.get_userdata(email)[3]
            result=bcrypt.checkpw(oldpassword,userpass)
            if result:
                newpassword=newpassword.encode("utf-8")
                userpass = bcrypt.hashpw(newpassword, bcrypt.gensalt(10))
                change = database_helper.change_pass(email,userpass)
                if (userpass and change):
                    return "", 200 # Password changed
                else:
                    return "", 500 # Cannot change password
            else:
                return "", 401 # Wrong password 
        else:
            return "", 401 # Not logged in

@app.route('/sign_out', methods=['DELETE'])
def sign_out():
    token = request.headers['Authorization']
    if token==None:
        return "", 400 # No token received
    else:
        result = database_helper.remove_login(token)
        if result:
            return "", 200 # Successfully signed out
        else:
            return "", 401 # Not signed in

def json_extract(obj, key):
    """Recursively fetch values from nested JSON."""
    arr = []

    def extract(obj, arr, key):
        """Recursively search for values of key in JSON tree."""
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, (dict, list)):
                    extract(v, arr, key)
                elif k == key:
                    arr.append(v)
        elif isinstance(obj, list):
            for item in obj:
                extract(item, arr, key)
        return arr

    values = extract(obj, arr, key)
    return values


if __name__ == '__main__':
    app.debug = True
    app.run()