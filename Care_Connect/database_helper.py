from flask import Flask, current_app, g
import sqlite3

DATABASE = 'database.db'

#def init_db():
#    with app.app_context():
#        db = get_db()
#        with app.open_resource('schema.sql', mode='r') as f:
#            db.cursor().executescript(f.read())
#        db.commit()

def get_db():
    db = getattr(g, 'db', None)
    if db is None:
        db = g.db = sqlite3.connect(DATABASE)
    return db

def disconnect_db():
    db = getattr(g, 'db', None)
    if db is not None:
        g.db.close()
        g.db = None

def get_hospdata(hplaceid):
    cursor = get_db().execute("select hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating from hospital where hplaceid = ?;", [hplaceid])
    result = cursor.fetchone()
    cursor.close()
    return result

def get_userdata(email):
    cursor = get_db().execute("select email, username, phone, passwrd from users where email = ?;", [email])
    result = cursor.fetchone()
    cursor.close()
    return result

def store_userdata(email, username, phone, passwrd):
    try:
        get_db().execute("insert into users(email, username, phone, passwrd) values (?,?,?,?);", [email, username, phone, passwrd])
        get_db().commit()
        return True
    except sqlite3.Error as er:
        print(er)
        return False

def get_allhospdata():
    cursor = get_db().execute("select * from hospital;")
    result = cursor.fetchall()
    cursor.close()
    return result

def get_alldeptdata():
    cursor = get_db().execute("select * from department;")
    result = cursor.fetchall()
    cursor.close()
    return result

def get_alldoctdata():
    cursor = get_db().execute("select * from doctor;")
    result = cursor.fetchall()
    cursor.close()
    return result

def hospital_exist(hplaceid): # To check if a user exists in database
    cursor = get_db().execute("select hplaceid from hospital where hplaceid = ?", [hplaceid])
    result = cursor.fetchone()
    cursor.close()
    if result==None:
        return False
    else:
        return True

def store_hospdata(hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating):
    try:
        get_db().execute("insert into hospital(hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating) values (?,?,?,?,?,?,?,?,?);", [hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating])
        get_db().commit()
        return True
    except sqlite3.Error as er:
        print(er)
        return False

def check_loginfromtoken(token):
    cursor = get_db().execute("select email from loggedin where token = ?", [token])
    result = cursor.fetchone()
    cursor.close()
    return result

def store_login(token, email):
    try:
        get_db().execute("insert into loggedin values (?,?);", [token, email])
        get_db().commit()
        return True
    except:
        return False

def remove_login(token):
    cursor = get_db().execute("select email from loggedin where token = ?", [token])
    result = cursor.fetchone()
    cursor.close()
    if result==None:
        return False
    else:
        try:
            res = get_db().execute("delete from loggedin where token = ?", [token])
            get_db().commit()
            return True
        except:
            return False

def change_pass(email,passwrd):
    try:
        get_db().execute("update users set passwrd = ? where email = ?", [passwrd,email])
        get_db().commit()
        return True
    except:
        return False