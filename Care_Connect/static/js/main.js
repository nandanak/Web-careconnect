var apikey = config.apikey;
var gembedurl = config.gembedurl;


window.onload = function(){
    let token = localStorage.getItem("token"); // Gets the token from localstorage to check authenticated or not
    let data = localStorage.getItem("data");
    let messages = localStorage.getItem("messages");
    if(token!=null){
      showprofile(); // To show the profile view, tabs, user details, messages
    }
    else{
      showwelcome();
    }
    if(data!=null || messages!=null){
      //window.location.href = '/hospital_detail';
      document.getElementById("searchdiv").style.display = "block";
      if(data!=null){
        showabout();
      }
      if(messages!=null){ 
        showsearch();
      }
    }
};



showprofile=function(){ // Shows profile page
    document.getElementById("welcomeview").style.display = "none";
    document.getElementById("profileview").style.display = "block";
  };
showwelcome=function(){ //Shows welcome page
    document.getElementById("profileview").style.display = "none";
    document.getElementById("welcomeview").style.display = "block";
  };

showabout=function(){
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  let pid = localStorage.getItem("pid");
  messages="<br><h2>"+data[1]+"</h2><a onclick='hideabout()' class='nav-item nav-link active'>Clear Details</a>";
  messages=messages+"<tr><td> <div class='dnd'><p>Address: "+data[2]+"</p><p>Phone: "+data[6]+"</p><p>Website: "+data[7]+"</p><p>Rating: "+data[8]+"</p><p><button onclick='directions();' class='btn btn-dark border-0'>Get directions</button></p><p><button onclick='showdepts();' class='btn btn-dark border-0'>Departments</button></p><div id='deptmsg' class='bg-white text-center rounded p-5' style='display:none'></div></div><iframe width='450' height='250' frameborder='0' style='border:0' referrerpolicy='no-referrer-when-downgrade' src='"+gembedurl+apikey+"&origin=place_id:"+pid+"&destination=place_id:"+data[0]+"' allowfullscreen></iframe></td></tr>";
  document.getElementById("aboutmsg").innerHTML=messages;
  document.getElementById("aboutmsg").style.display = "block";
};
showsearch=function(){
  let messages = localStorage.getItem("messages");
  messages = JSON.parse(messages);
  document.getElementById("searchdiv").style.display = "block";
  document.getElementById("searchmsg").innerHTML=messages;
  document.getElementById("searchmsg").style.display = "block";
};
showdepts=function(){
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  hosp=data[0];
  let nhttp = new XMLHttpRequest();
  nhttp.open("GET", "/get_all_departments", true);
  nhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  nhttp.send();
  nhttp.onreadystatechange=function(){
    if (nhttp.readyState==4){
      if(nhttp.status==200){
        let newdata = JSON.parse(nhttp.responseText).data;    
        document.getElementById("deptmsg").style.display = "block";
        let depts= "<h3>Departments</h3>";
        for (i=0;i<newdata.length;i++){
          if (hosp == newdata[i][3]) {
            depts=depts+"<tr><td><div class='dnd'><p> Department of "+newdata[i][1]+"</p><p>Contact Information: <button id='btnnr"+i+"' onclick='shownr("+i+");' class='btn btn-dark border-0'>Show</button><div id='pnr"+i+"' style='display:none'>"+newdata[i][2]+"</div></p><p id='nrmsg"+i+"' class='alert alert-info' role='alert' style='display:none'></p></div></td></tr>";
          }
        }
        document.getElementById("deptmsg").innerHTML=depts;
      }
    }
  }        
};
shownr=function(i){
  let token = localStorage.getItem("token");
  data = { 'token': token };
  let xhttp = new XMLHttpRequest(); // Xmlhttp request instance
  xhttp.open("GET", "/check_login", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("data", JSON.stringify(data));
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){ 
      if(xhttp.status==200){
        let pnr = "pnr"+i.toString();
        let btnnr = "btnnr"+i.toString();
        document.getElementById(pnr).style.display = "block";
        document.getElementById(btnnr).style.display = "none";
      }
      else if(xhttp.status==401){
        let nrmsg = "nrmsg"+i.toString();
        document.getElementById(nrmsg).innerHTML="401: Please login to view contact details";
        document.getElementById(nrmsg).style.display = "block";
        setTimeout(() => {
          const box = document.getElementById(nrmsg);
          box.style.display = 'none';
        }, 3000);
      }
      else{
        let nrmsg = "nrmsg"+i.toString();
        document.getElementById(nrmsg).innerHTML="400: Invalid input";
        document.getElementById(nrmsg).style.display = "block";
      }
    }
  };
};
hideabout=function(){ //Shows welcome page
  document.getElementById("aboutmsg").style.display = "none";
  localStorage.removeItem("data");
  x = document.getElementById("searchmsg");
  if (x.style.display==none)
    localStorage.removeItem("pid");
};
hidesearch=function(){ //Shows welcome page
  document.getElementById("searchmsg").style.display = "none";
  localStorage.removeItem("messages");
  x = document.getElementById("aboutmsg");
  if (x.style.display==none)
    localStorage.removeItem("pid");
};
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function successCallback(position) {
  let data = "latlng=".concat(position.coords.latitude, ",", position.coords.longitude);
  x.innerHTML = data;
  searchhospital(data);
}
function errorCallback(error) {
  x.innerHTML = "Error " + error;
}

function suggesthosp(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/get_all_hospitals", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){
      if(xhttp.status==200){
        let data = JSON.parse(xhttp.responseText).data;
        let msg=[];
        for (i=0;i<data.length;i++){
          msg.push(data[i][1]);
        }
        autocomplete(document.getElementById("hospinput"), msg);
      }
    }
  }

}
function departdrop(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/get_all_hospitals", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){
      if(xhttp.status==200){
        let data = JSON.parse(xhttp.responseText).data;
        const depdropdown = document.getElementById("depdropdown");
        let hosp = document.getElementById("hospinput").value;
        for (i=0;i<data.length;i++){
          if (data[i][1]==hosp){
            hosp = data[i][0];
          }
        }
        let nhttp = new XMLHttpRequest();
        nhttp.open("GET", "/get_all_departments", true);
        nhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        nhttp.send();
        nhttp.onreadystatechange=function(){
          if (nhttp.readyState==4){
            if(nhttp.status==200){
              let data = JSON.parse(nhttp.responseText).data;    
              let msg=[];
              for (i=0;i<data.length;i++){
                if (hosp == data[i][3]) {
                  msg.push(data[i][1]);
                }
              }
              for (let key in msg) {
                let option = document.createElement("option");
                option.setAttribute('value', msg[key]);              
                let optionText = document.createTextNode(msg[key]);                
                option.appendChild(optionText);   
                depdropdown.appendChild(option);                
              }
            }
          }
        }
      }
    }
  }
}

function doctordrop(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/get_all_hospitals", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){
      if(xhttp.status==200){
        let data = JSON.parse(xhttp.responseText).data;
        const doctdropdown = document.getElementById("doctdropdown");
        let dep = document.getElementById("depdropdown").value;
        let hosp = document.getElementById("hospinput").value;
        for (i=0;i<data.length;i++){
          if (data[i][1]==hosp){
            hosp = data[i][0];
          }
        }
        let mhttp = new XMLHttpRequest();
        mhttp.open("GET", "/get_all_departments", true);
        mhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        mhttp.send();
        mhttp.onreadystatechange=function(){
          if (mhttp.readyState==4){
            if(mhttp.status==200){
              let data = JSON.parse(mhttp.responseText).data;              
              for (i=0;i<data.length;i++){
                if (data[i][3]==hosp && dep==data[i][1]){
                  dep = data[i][0];
                }
              }
              let nhttp = new XMLHttpRequest();
              nhttp.open("GET", "/get_all_doctors", true);
              nhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
              nhttp.send();
              nhttp.onreadystatechange=function(){
                if (nhttp.readyState==4){
                  if(nhttp.status==200){
                    let data = JSON.parse(nhttp.responseText).data;    
                    let msg=[];                                      
                    for (i=0;i<data.length;i++){
                      if (dep==data[i][2] && hosp==data[i][3]) {                        
                        msg.push(data[i][1]);
                      }
                    }                    
                    for (let key in msg) {
                      let option = document.createElement("option");
                      option.setAttribute('value', msg[key]);              
                      let optionText = document.createTextNode(msg[key]);                
                      option.appendChild(optionText);   
                      doctdropdown.appendChild(option);
                    }
                  }
          }
        }
      }
    }
  }
}
    }
  }
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
              departdrop();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
/*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}



function search(){
  let location=document.getElementById("loc").value;
  let data = "address=".concat(location);
  document.getElementById("scrollmsg").innerHTML = "Scroll down";
  document.getElementById("scrollmsg").style.display = "block";
  document.getElementById("aboutmsg").style.display = "none";
  document.getElementById("searchmsg").innerHTML = "Fetching...";
  document.getElementById("searchmsg").style.display = "block";
  searchhospital(data);
}

function hospital(pid){
  data = JSON.stringify(pid);
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/get_hospital_details", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("data", data);
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){
      if(xhttp.status==200){
        let newdata = JSON.parse(xhttp.responseText).data;              
        localStorage.setItem("data", JSON.stringify(newdata));        
        showabout();
      }
      else if(xhttp.status==400){
        document.getElementById("aboutmsg").innerHTML="400 Bad Request";
        document.getElementById("aboutmsg").style.display = "block";
      }
      else if(xhttp.status==401){
        document.getElementById("aboutmsg").innerHTML="401 Unauthorized";
        document.getElementById("aboutmsg").style.display = "block";
      }
      else{
        document.getElementById("aboutmsg").innerHTML="404 Not Found";
        document.getElementById("aboutmsg").style.display = "block";
      }
    }
  };
}
function directions(){
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  let place = data[0];
  let name = data[1];
  name = encodeURI(name);
  window.open("https://www.google.com/maps/dir/?api=1&destination="+name+"&destination_place_id="+place, "_blank");
}

function searchhospital(data){
    document.getElementById("searchmsg").innerHTML = "Fetching...";
    document.getElementById("searchmsg").style.display = "block";
    data = JSON.stringify(data);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get_nearby_hospitals", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("data", data);
    xhttp.send();
    xhttp.onreadystatechange=function(){
      if (xhttp.readyState==4){
        if(xhttp.status==200){
          let newdata = JSON.parse(xhttp.responseText).data;          
          let pid=newdata[0].split("@#thisisspace$%");
          messages="<br><h2>Hospitals found</h2><a onclick='hidesearch()' class='nav-item nav-link active'>Clear Search</a>";
          for (i=0;i<newdata.length;i++){
            unique = "new"+i; // To get unique id for each message
            //messages=messages+"<tr><td> <div id='" + unique +"' class='dnd' '>"+newdata[i]+"</div></td></tr>";
            msg=newdata[i].split("@#thisisspace$%");
            messages=messages+"<tr><td> <a id='"+msg[6]+"' href='#searchdiv' onclick='hospital(this.id)'><div id='" + unique +"' class='dnd'><p>"+msg[0]+"</p><p>"+msg[3]+"</p><p>"+msg[4]+", "+msg[5]+"</p></div></a></td></tr>";
          }
          localStorage.setItem("pid", pid[7]);
          localStorage.setItem("messages", JSON.stringify(messages));
          showsearch();          
        }
        else if(xhttp.status==400){
          document.getElementById("searchmsg").innerHTML="400 Bad Request";
          document.getElementById("searchmsg").style.display = "block";
        }
        else if(xhttp.status==401){
          document.getElementById("searchmsg").innerHTML="401 Unauthorized";
          document.getElementById("searchmsg").style.display = "block";
        }
        else{
          document.getElementById("searchmsg").innerHTML="404 Not Found";
          document.getElementById("searchmsg").style.display = "block";
        }
      }
    };
}

function bookappointment(){
  ushosp = document.getElementById("hospinput").value;
  usdept = document.getElementById("depdropdown").value;
  usdoct = document.getElementById("doctdropdown").value;
  usname = document.getElementById("inpname").value;
  usmail = document.getElementById("inpmail").value;
  usdatime = document.getElementById("inpdatetime").value;
  let token = localStorage.getItem("token");
  data = { 'hospital': ushosp, 'department': usdept, 'doctor': usdoct, 'name': usname, 'email': usmail, 'datetime': usdatime, 'token': token };
  let xhttp = new XMLHttpRequest(); // Xmlhttp request instance
  xhttp.open("POST", "/send_mail", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(data));
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){ 
      if(xhttp.status==200){
        document.getElementById("appointmsg").innerHTML="200: Appointment Booked";
        document.getElementById("appointmsg").style.display = "block";
        setTimeout(() => {
          const box = document.getElementById('appointmsg');
          box.style.display = 'none';
        }, 3000);
      }
      else if(xhttp.status==400){
        document.getElementById("appointmsg").innerHTML="400: Invalid input";
        document.getElementById("appointmsg").style.display = "block";
      }
      else{
        document.getElementById("appointmsg").innerHTML="401: Please login to book appointment";
        document.getElementById("appointmsg").style.display = "block";
        setTimeout(() => {
          const box = document.getElementById('appointmsg');
          box.style.display = 'none';
        }, 3000);
      }
  }
};
}

Xpasslength=5;
function signinvalidation(){
    var password=document.getElementById("sipass").value;
    var email=document.getElementById("siemail").value;
    document.getElementById("siemail").value="";
    document.getElementById("sipass").value="";
    if(password.length<Xpasslength){

        document.getElementById("signoutmsg").innerHTML="Password is too short";
        document.getElementById("signoutmsg").style.display = "block";
    }
    else{
        let data = { 'email': email, 'password': password };
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/sign_in", true);
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(data));
        xhttp.onreadystatechange=function(){
            if (xhttp.readyState==4){ 
                if(xhttp.status==201){
                    let token = JSON.parse(xhttp.responseText).data;
                    localStorage.setItem("token", token);
                    showprofile();
                    document.getElementById("welcomemessagesi").innerHTML = "201: User logged in";
                    document.getElementById("welcomemessagesi").style.display = "block";
                    setTimeout(() => {
                      const box = document.getElementById('welcomemessagesi');
                      box.style.display = 'none';
                    }, 3000);
                }
                else if(xhttp.status==401){
                    document.getElementById("welcomemessagesi").innerHTML = "401: Wrong password";
                    document.getElementById("welcomemessagesi").style.display = "block";
                }
                else if(xhttp.status==400){
                    document.getElementById("welcomemessagesi").innerHTML = "400: Invalid input";
                    document.getElementById("welcomemessagesi").style.display = "block";
                }
                else{
                    document.getElementById("welcomemessagesi").innerHTML = "404: User does not exist";
                    document.getElementById("welcomemessagesi").style.display = "block";
                }
            }
        };
    }
}

function signupvalidation(){
    var supass=document.getElementById("supass").value;
    var suconf=document.getElementById("suconf").value;
    if(supass!=suconf){ // Check if passwords match
      document.getElementById("welcomemessagesu").innerHTML="Passwords do not match";
      document.getElementById("welcomemessagesu").style.display = "block";
    }
    else{
      if(supass.length<Xpasslength){ //Check length
        document.getElementById("welcomemessagesu").innerHTML="Password is too short";
        document.getElementById("welcomemessagesu").style.display = "block";
      }
      else{
        var email = document.getElementById("suemail").value; // All form values are retreived one by one
        var password = supass;
        var confirm = suconf;
        var username = document.getElementById("suuser").value;
        var phone = document.getElementById("sutel").value;
        document.getElementById("suemail").value="";
        document.getElementById("suuser").value="";
        document.getElementById("sutel").value="";
        document.getElementById("supass").value="";
        document.getElementById("suconf").value="";
        // Form values organized into JSON format
        data = { 'email': email, 'username': username, 'phone': phone, 'password': password, 'confirm': confirm };
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/sign_up", true);
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(data)); // Send along with the JSON data
        xhttp.onreadystatechange=function(){
          if (xhttp.readyState==4){ //Request successful
            if(xhttp.status==201){ // Response successful
              document.getElementById("welcomemessagesu").innerHTML = "201: User created. Please sign in"; // User created
              document.getElementById("welcomemessagesu").style.display = "block";
              setTimeout(() => {
                const box = document.getElementById('welcomemessagesu');
                box.style.display = 'none';
              }, 3000);
            }
            else if(xhttp.status==400){
              document.getElementById("welcomemessagesu").innerHTML = "400: Invalid input";
              document.getElementById("welcomemessagesu").style.display = "block";
            }
            else if(xhttp.status==406){
              document.getElementById("welcomemessagesu").innerHTML = "406: Password too short";
              document.getElementById("welcomemessagesu").style.display = "block";
            }
            else if(xhttp.status==401){
              document.getElementById("welcomemessagesu").innerHTML = "401: Passwords does not match";
              document.getElementById("welcomemessagesu").style.display = "block";
            }else{
              document.getElementById("welcomemessagesu").innerHTML = "409: User already exists";
              document.getElementById("welcomemessagesu").style.display = "block";
            }
          }
        };
      }
    }
  }
  
  function changepass(){
    var oldpass=document.getElementById("oldpass").value;
    var newpass=document.getElementById("newpass").value;
    var newconf=document.getElementById("confpass").value;
    token=localStorage.getItem("token");
    if(newpass.length<Xpasslength){
      document.getElementById("accountmessage").innerHTML="Password is too short";
      document.getElementById("accountmessage").style.display = "block";
      return false;
    }
    if(newpass!=newconf){
      document.getElementById("accountmessage").innerHTML="Passwords do not match";
      document.getElementById("accountmessage").style.display = "block";
      return false;
    }
    data = { 'oldpassword': oldpass, 'newpassword': newpass };
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/change_password", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", token);
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange=function(){
      if (xhttp.readyState==4){
        if(xhttp.status==200){
          document.getElementById("accountmessage").innerHTML="200: Password changed";
          document.getElementById("accountmessage").style.display = "block";
          document.getElementById('oldpass').value = '';
          document.getElementById('newpass').value = '';
          document.getElementById('confpass').value = '';
          setTimeout(() => {
            const box = document.getElementById('accountmessage');
            box.style.display = 'none';
          }, 3000);
        }
        else if(xhttp.status==500){
          document.getElementById("accountmessage").innerHTML="500: Internal Server Error";
          document.getElementById("accountmessage").style.display = "block";
        }
        else{
          document.getElementById("accountmessage").innerHTML="401: Wrong password";
          document.getElementById("accountmessage").style.display = "block";
        }
      }
    };
  }
  
  function signout() {
    token=localStorage.getItem("token");
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/sign_out", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
    xhttp.onreadystatechange=function(){
      if (xhttp.readyState==4 && xhttp.status==200){
        token=null;
        localStorage.removeItem("token");
        showwelcome();
        document.getElementById("signoutmsg").innerHTML="200: Successfully Signed Out!";
        document.getElementById("signoutmsg").style.display = "block";
        setTimeout(() => {
          const box = document.getElementById('signoutmsg');
          box.style.display = 'none';
        }, 3000);
      }
    };
  }

  
