import { showprofile, showwelcome, searchhospital } from './App';

// Navigation Section (Functional Component)
const NavigationSection = () => {
    let Xpasslength=5;
    const signinValidation = (event) => {
        event.preventDefault();
        // Your logic for sign-in form validation
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
    };
    
    const signupValidation = (event) => {
        event.preventDefault();
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
            let data = { 'email': email, 'username': username, 'phone': phone, 'password': password, 'confirm': confirm };
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
    };
    
    const changePassword = (event) => {
        event.preventDefault();
        var oldpass=document.getElementById("oldpass").value;
        var newpass=document.getElementById("newpass").value;
        var newconf=document.getElementById("confpass").value;
        let token=localStorage.getItem("token");
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
        let data = { 'oldpassword': oldpass, 'newpassword': newpass };
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
    };

    const signOut = (event) => {
        event.preventDefault();
        let token=localStorage.getItem("token");
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
    };


    return (
      // Your JSX for the navigation section
      <div id="navbar" className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <a href="#" className="navbar-brand">
                    <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>CareConnect</h1>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <a href="#" className="nav-item nav-link active">Home</a>
                        <a href="#aboutdiv" className="nav-item nav-link">About</a>
                        <a href="#appointdiv" className="nav-item nav-link">Appointment</a>
                        <a href="#testdiv" className="nav-item nav-link">Testimonial</a>
                        <a href="#blogdiv" className="nav-item nav-link">Blog Posts</a>
                        <div className="nav-item nav-link" id="welcomeview" style={{ display:'none' }}>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SigninModal">
                                Sign In
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SignupModal" style={{ position:'relative', left: '5.01px' }}>
                                Sign Up
                            </button>
                        </div>
                            <div className="modal fade" id="SigninModal" tabIndex="-1" aria-labelledby="SigninLabel" aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ color: '#13C5DD' }}>
                                        <div className="modal-header">
                                            <h4 className="modal-title w-100 font-weight-bold">Sign In</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                        </div>
                                        <form id="signinform" onSubmit={signinValidation}>
                                            <div className="modal-body">
                                                <div className="md-form mb-5">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input type="email" id="siemail" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="siemail">Email</label>
                                                </div>           
                                                <div className="md-form mb-4">
                                                    <i className="fas fa-lock prefix grey-text"></i>
                                                    <input type="password" id="sipass" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="sipass">Password</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer  justify-content-center">
                                                <button type="submit" id="signinbtn" value="save" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                        <p id="welcomemessagesi" className="alert alert-info" role="alert" style={{ display:'none' }}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="SignupModal" tabIndex="-1" aria-labelledby="SignupLabel" aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ color: '#13C5DD' }}>
                                        <div className="modal-header">
                                            <h4 className="modal-title w-100 font-weight-bold">Sign Up</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                        </div>

                                        <form id="signupform" onSubmit={signupValidation}>
                                            <div className="modal-body">
                                                <div className="md-form mb-5">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input type="email" id="suemail" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="suemail">Email</label>
                                                </div>
                                                <div className="md-form mb-4">
                                                    <i className="fas fa-user prefix grey-text"></i>
                                                    <input type="text" id="suuser" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="suuser">Username</label>
                                                </div>
                                                <div className="md-form mb-4">
                                                    <i className="fas fa-phone prefix grey-text"></i>
                                                    <input type="tel" id="sutel" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="sutel">Phone number</label>
                                                </div>
                                                <div className="md-form mb-4">
                                                    <i className="fas fa-lock prefix grey-text"></i>
                                                    <input type="password" id="supass" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="supass">New Password</label>
                                                </div>
                                                <div className="md-form mb-4">
                                                    <i className="fas fa-lock prefix grey-text"></i>
                                                    <input type="password" id="suconf" className="form-control validate" />
                                                    <label data-bs-error="wrong" data-bs-success="right" htmlFor="suconf">Confirm Password</label>
                                                </div>
                                                <div className="modal-footer  justify-content-center">
                                                    <button type="submit" id="signupbtn" value="save" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                        <p id="welcomemessagesu" className="alert alert-info" role="alert" style={{ display:'none' }}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        <div id="profileview" className="nav-item nav-link" style={{ display:'none' }}>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AccountModal">
                                Account
                            </button>
                            <button type="button" onClick={signOut} className="btn btn-primary" data-bs-toggle="modal">
                                Sign Out
                            </button>
                        </div>
                            <div className="modal fade" id="AccountModal" tabIndex="-1" aria-labelledby="AccountLabel" aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ color: '#13C5DD' }}>
                                        <div className="modal-header">
                                            <h4 className="modal-title w-100 font-weight-bold">My Account</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                        </div>
                                        <form id="changepassform" onSubmit={changePassword}>
                                            <div className="modal-body">
                                                <div>
                                                    <div className="md-form mb-4">
                                                        <i className="fas fa-lock prefix grey-text"></i>
                                                        <input type="password" id="oldpass" className="form-control validate" />
                                                        <label data-bs-error="wrong" data-bs-success="right" htmlFor="oldpass">Old Password</label>
                                                    </div>
                                                    <div className="md-form mb-4">
                                                        <i className="fas fa-lock prefix grey-text"></i>
                                                        <input type="password" id="newpass" className="form-control validate" />
                                                        <label data-bs-error="wrong" data-bs-success="right" htmlFor="newpass">New Password</label>
                                                    </div>
                                                    <div className="md-form mb-4">
                                                        <i className="fas fa-lock prefix grey-text"></i>
                                                        <input type="password" id="confpass" className="form-control validate" />
                                                        <label data-bs-error="wrong" data-bs-success="right" htmlFor="confpass">Confirm Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer  justify-content-center">
                                                <button type="submit" id="changepassbtn" value="save" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                        <p id="accountmessage" className="alert alert-info" role="alert" style={{ display:'none' }}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </nav>
        </div>
      </div>
    );
  };
  
  // Hero Section (Functional Component)
const HeroSection = () => {
    var x = document.getElementById("demo");
    const successCallback = (position) => {
        let data = "latlng=".concat(position.coords.latitude, ",", position.coords.longitude);
        x.innerHTML = data;
        searchhospital(data);
    };

    const errorCallback = (error) => {
        x.innerHTML = "Error " + error;
    };
    const showDiv = (event) => {
        event.preventDefault();
        var x = document.getElementById("searchtab");
           if (x.style.display === "none") {
               x.style.display = "block";
           } else {
               x.style.display = "none";
           }
    };

    const getLocation = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };

    const search = (event) => {
        event.preventDefault();
        let location=document.getElementById("loc").value;
        let data = "address=".concat(location);
        document.getElementById("scrollmsg").innerHTML = "Scroll down";
        document.getElementById("scrollmsg").style.display = "block";
        document.getElementById("aboutmsg").style.display = "none";
        document.getElementById("searchmsg").innerHTML = "Fetching...";
        document.getElementById("searchmsg").style.display = "block";
        searchhospital(data);
    };
    return (
      // Your JSX for the hero section
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
            <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                    <p id="signoutmsg" className="alert alert-info" role="alert" style={{ width: '40%', textAlign: 'center', display:'none', left:'55rem', top:'20px', zIndex: 10 }}></p>
                    <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5" style={{ borderColor: 'rgba(256, 256, 256, .3)', zIndex: 10 }}>Welcome To CareConnect</h5>
                    <h1 className="display-1 text-white mb-md-4">Find The Best Healthcare Near You</h1>
                    <div className="pt-2">
                        <button id="btnsearch" onClick={showDiv} className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Search</button>
                        <a href="#appointdiv" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Book Appointment</a>
                    </div>
                    <div className="mx-auto" style={{ width: '100%', maxWidth: '600px', display: 'none' }} id="searchtab">
                        <form onSubmit={search}>
                        <div className="input-group" style={{ left:'-60px', top:'30px' }}>
                            <select defaultValue="op1" className="form-control border-primary w-25" style={{ height: '60px', backgroundColor: '#fff' }}>
                                <option value="op1">Hospital</option>
                                {/*<!--<option value="1">Department</option>
                                <option value="2">Physician</option> -->*/}
                            </select>
                            <input id="loc" type="text" className="form-control border-primary w-50" placeholder="Keyword" required />
                            <button type="submit" value="save" className="btn btn-dark border-0 w-25">Search</button>
                            <button onClick={getLocation} style={{ position:'absolute', left:'610px' }} className="btn btn-dark border-0 w-25">Search by your location</button>
                            <div id="scrollmsg" className="bg-white text-center rounded p-3" style={{ position: 'relative', left:'220px', top:'40px', display:'none' }}></div>
                        </div>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  // Search Section (Functional Component)
const SearchSection = () => {
    const hidesearch = (event) => {
        event.preventDefault();
        document.getElementById("divfound").style.display = "none";
        localStorage.removeItem("messages");
        let x = document.getElementById("aboutmsg");
        if (x.style.display=="none")
          localStorage.removeItem("pid");
    };
    const hideabout = (event) => {
        event.preventDefault();
        document.getElementById("aboutmsg").style.display = "none";
        localStorage.removeItem("data");
        let x = document.getElementById("divfound");
        if (x.style.display=="none")
          localStorage.removeItem("pid");
    };
    const showdepts = (event) => {
        event.preventDefault();
        let data = localStorage.getItem("data");
        data = JSON.parse(data);
        let hosp=data[0];
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
              for (let i=0;i<newdata.length;i++){
                if (hosp == newdata[i][3]) {
                  depts=depts+"<tr><td><div class='dnd'><p> Department of "+newdata[i][1]+"</p><p>Contact Information: <button id='btnnr"+i+"' onclick='shownr("+i+");' class='btn btn-dark border-0'>Show</button><div id='pnr"+i+"' style='display:none'>"+newdata[i][2]+"</div></p><p id='nrmsg"+i+"' class='alert alert-info' role='alert' style='display:none'></p></div></td></tr>";
                }
              }
              document.getElementById("deptmsg").innerHTML=depts;
            }
          }
        }        
    };
    const directions = (event) => {
        event.preventDefault();
        let data = localStorage.getItem("data");
        data = JSON.parse(data);
        let place = data[0];
        let name = data[1];
        name = encodeURI(name);
        window.open("https://www.google.com/maps/dir/?api=1&destination="+name+"&destination_place_id="+place, "_blank");
      };
    return (
      // Your JSX for the search section
      <div className="container-fluid py-5" id="searchdiv" style={{ display:'none' }}>
        <div className="container">
            <div className="row gx-5">
                <div id="aboutmsg" className="bg-white text-center rounded p-5" style={{ display:'none' }}>
                <div id="namemsg" ></div>
                <a id="clearaboutmsg" className="nav-item nav-link active" onClick={hideabout}>Clear Details</a>
                <div className="bg-white text-center rounded">
                    <table style={{ position:'relative', left:'222.49px' }}><tbody><tr><td> 
                        <div className='dnd'>
                            <div id="detailmsg" ></div>
                            <p><button onClick={directions} className='btn btn-dark border-0'>Get directions</button></p>
                            <p><button onClick={showdepts} className='btn btn-dark border-0'>Departments</button></p>
                            <div id='deptmsg' className='bg-white text-center rounded p-5' style={{ display:'none' }}></div>
                        </div>
                        <div id="framemsg"></div>
                    </td></tr></tbody></table>
                </div>
                </div>
                <div id="divfound" className="bg-white text-center rounded p-5" style={{ display:'none' }}>
                <div id="foundmsg"><h2>Hospitals found</h2></div>
                <a id="clearsearchmsg" className="nav-item nav-link active" onClick={hidesearch}>Clear Search</a>
                <div id="searchmsg" className="bg-white text-center rounded"></div>
                </div>
            </div>
        </div>
    </div>
    );
  };
  
  // About Section (Functional Component)
  const AboutSection = () => {
    return (
      // Your JSX for the about section
      <div className="container-fluid py-5" id="aboutdiv">
        <div className="container">
            <div className="row gx-5">
                <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                    <div className="position-relative h-100">
                        <img className="position-absolute w-100 h-100 rounded" src="/static/img/about2.jpg" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="mb-4">
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                    </div>
                    <p>Welcome to our Hospital Finder website! We provide a convenient way to search for hospitals near you and book appointments with doctors. Our mission is to help you find the best healthcare options available in your area. We are committed to providing a seamless and user-friendly experience for all our visitors. Thank you for choosing us as your trusted healthcare partner.</p>
                    <div className="row g-3 pt-3">
                        <div className="col-sm-3 col-6">
                            <div className="bg-light text-center rounded-circle py-4">
                                <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                                <h6 className="mb-0">Quality<small className="d-block text-primary">Healthcare</small></h6>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6">
                            <div className="bg-light text-center rounded-circle py-4">
                                <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                                <h6 className="mb-0">Trustworthy<small className="d-block text-primary">Services</small></h6>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6">
                            <div className="bg-light text-center rounded-circle py-4">
                                <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                                <h6 className="mb-0">Appointment<small className="d-block text-primary">Scheduling</small></h6>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6">
                            <div className="bg-light text-center rounded-circle py-4">
                                <i className="fa fa-3x fa-ambulance text-primary mb-3"></i>
                                <h6 className="mb-0">Easy<small className="d-block text-primary">Navigation</small></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  // Appointment Section (Functional Component)
  const AppointmentSection = () => {
    const doctordrop = (event) => {
        event.preventDefault();
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
              for (let i=0;i<data.length;i++){
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
                    for (let i=0;i<data.length;i++){
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
                          for (let i=0;i<data.length;i++){
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
    };
    const bookappointment = (event) => {
        event.preventDefault();
        var ushosp = document.getElementById("hospinput").value;
        var usdept = document.getElementById("depdropdown").value;
        var usdoct = document.getElementById("doctdropdown").value;
        var usname = document.getElementById("inpname").value;
        var usmail = document.getElementById("inpmail").value;
        var usdatime = document.getElementById("inpdatetime").value;
        let token = localStorage.getItem("token");
        let data = { 'hospital': ushosp, 'department': usdept, 'doctor': usdoct, 'name': usname, 'email': usmail, 'datetime': usdatime, 'token': token };
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
    };
    return (
      // Your JSX for the appointment section
      <div className="container-fluid bg-primary my-5 py-5" id="appointdiv">
        <div className="container py-5">
            <div className="row gx-5">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="mb-4">
                        <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Appointment</h5>
                        <h2 className="display-4">Book Your Next Appointment with Ease: Schedule Your Visit Today!</h2>
                    </div>
                    <p className="text-white mb-5">Our website provides a hassle-free appointment booking system, allowing you to easily book appointments with your desired hospital and doctor. With just a few clicks, you can select the date, time, and doctor of your choice, and receive a confirmation email with all the necessary details. We understand the importance of timely healthcare services and strive to make the process as seamless as possible for our users. Book your next appointment with us and experience the convenience of our platform.</p>

                </div>
                <div className="col-lg-6">
                    <div className="bg-white text-center rounded p-5">
                        <h1 className="mb-4">Book An Appointment</h1>
                        <form autoComplete="off" id="appointform" onSubmit={bookappointment}>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <div className="time" id="inp" data-target-input="nearest">
                                        <input id="hospinput" type="text"
                                            className="autocomplete form-control bg-light border-0"
                                            placeholder="Hospital Name" data-target="#hospinput" style={{ height: '55px' }} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <select defaultValue="dp1" id="depdropdown" onChange={doctordrop} className="form-select bg-light border-0" style={{ height: '55px' }}>
                                        <option value="dp1">Choose Department</option>
                                    </select>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <select defaultValue="dt1" id="doctdropdown" className="form-select bg-light border-0" style={{ height: '55px' }}>
                                        <option value="dt1">Select Doctor</option>
                                    </select>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input id="inpname" type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{ height: '55px' }} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input id="inpmail" type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{ height: '55px' }} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="date" id="datetime" data-target-input="nearest" style={{ position: 'relative' }}>
                                        <input id="inpdatetime" type="datetime-local"
                                            className="form-control bg-light border-0"
                                            placeholder="Date & Time" data-target="#inpdatetime" style={{ height: '55px' }} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit" value="save">Make An Appointment</button>
                                </div>
                            </div>
                        </form>
                        <p id="appointmsg" className="alert alert-info" role="alert" style={{ display:'none' }}>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  };
  
  // Testimonial Section (Functional Component)
  const TestimonialSection = () => {
    return (
      // Your JSX for the testimonial section
      <div className="container-fluid py-5" id="testdiv">
       <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Testimonial</h5>
            <h1 className="display-4">Patients Say About Our Services</h1>
        </div>
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="testimonial-grid">
                    <div className="testimonial-item">
                        <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                        <p className="fs-4 fw-normal">I had to find a hospital for my grandmother and came across this website. It made the process so much easier and less stressful. We were able to find a great hospital close by with excellent reviews. Thank you!</p>
                        <h3>Damon</h3>
                        <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                    </div>
                    <div className="testimonial-item">
                        <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                        <p className="fs-4 fw-normal">This website was a lifesaver when I needed to find an emergency room. The map feature was incredibly helpful in finding a hospital that was close by and had good ratings. I would definitely recommend this site to anyone in need of finding a hospital quickly.</p>
                        <h3>Elsa</h3>
                        <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                    </div>
                    <div className="testimonial-item">
                        <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                        <p className="fs-4 fw-normal">I've been using this hospital finder website for a while now, and I must say, it's one of the most reliable sources out there. It's helped me find the best hospitals in town for my regular checkups and medical treatments. Highly recommended!</p>
                        <h3>John</h3>
                        <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  };
  
  // Blog Section (Functional Component)
  const BlogSection = () => {
    return (
      // Your JSX for the blog section
      <div className="container-fluid py-5" id="blogdiv">
        <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Blog Post</h5>
                <h1 className="display-4">Insights and Inspiration: Discover Our Latest Medical Blog Posts</h1>
            </div>
            <div className="row g-5">
                <div className="col-xl-4 col-lg-6">
                    <div className="bg-light rounded overflow-hidden">
                        <img className="img-fluid w-100" src="/static/img/Unknown-3" alt="" />
                        <div className="p-4">
                            <a className="h3 d-block mb-3" href="https://www.stanfordchildrens.org/en/topic/default?id=why-childhood-immunizations-are-important-1-4510">Why Childhood Immunizations Are Important</a>
                            <p className="m-0">Vaccinations protect children against serious illnesses and diseases, and they are an important part of ensuring their overall health and well-being.</p>
                        </div>

                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="bg-light rounded overflow-hidden">
                        <img className="img-fluid w-100" src="/static/img/Unknown-2" alt="" />
                        <div className="p-4">
                            <a className="h3 d-block mb-3" href="https://www.mayoclinic.org/diseases-conditions/mental-illness/in-depth/mental-health/art-20046477">Mental health: Overcoming the stigma of mental illness</a>
                            <p className="m-0">Mental health stigma can prevent individuals from seeking help and lead to discrimination. Learn how to recognize and overcome mental health stigma.</p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-6">
                    <div className="bg-light rounded overflow-hidden">
                        <img className="img-fluid w-100" src="/static/img/bloga.jpeg" alt="" />
                        <div className="p-4">
                            <a className="h3 d-block mb-3" href="https://www.hopkinsmedicine.org/health/wellness-and-prevention/7-heart-benefits-of-exercise">7 Heart Benefits of Exercise</a>
                            <p className="m-0">Regular exercise can improve heart health by reducing the risk of heart disease, stroke, and other related conditions.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
      </div>
    );
  };
  
  export {
    NavigationSection,
    HeroSection,
    SearchSection,
    AboutSection,
    AppointmentSection,
    TestimonialSection,
    BlogSection,
  };
  