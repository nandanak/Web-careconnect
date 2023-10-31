import React, { useEffect } from 'react';
import {
  NavigationSection,
  HeroSection,
  SearchSection,
  AboutSection,
  AppointmentSection,
  TestimonialSection,
  BlogSection,
} from './funccomps';
import { config } from './config';


 // Shows profile page
const showprofile = () => {
  document.getElementById("welcomeview").style.display = "none";
  document.getElementById("profileview").style.display = "block";
};
//Shows welcome page
const showwelcome = () => {
  document.getElementById("profileview").style.display = "none";
  document.getElementById("welcomeview").style.display = "block";
};
const showsearch = () => {
  let messages = localStorage.getItem("messages");
  document.getElementById("searchdiv").style.display = "block";
  document.getElementById("searchmsg").innerHTML=messages;
  document.getElementById("divfound").style.display = "block";
};
//Shows welcome page
const hospital = (pid) => {
  window.alert("PIDD");
  let data = JSON.stringify(pid);
  console.log(data);
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
};
const searchhospital = (data) => {
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
        document.getElementById("clearsearchmsg").style.display = "block";
        document.getElementById("foundmsg").style.display = "block";
        let hospitalaElement;
        let divElement;
        let table = document.createElement('table');
        table.setAttribute("style", "position: relative; left: 18rem");
            let newRow;
            let newCell;
            let firstPTag;
            let secondPTag;
            let thirdPTag;
          for (let i=0;i<newdata.length;i++){
            let unique = "new"+i; // To get unique id for each message
            //messages=messages+"<tr><td> <div id='" + unique +"' class='dnd' '>"+newdata[i]+"</div></td></tr>";
            let msg=newdata[i].split("@#thisisspace$%");
            hospitalaElement = document.createElement('a');
            hospitalaElement.setAttribute('id', msg[6]);
            hospitalaElement.setAttribute('href', '#searchdiv');
            hospitalaElement.addEventListener('click', (function (msgID) {
              return function() {
                  hospital(msgID); // Using the value from the loop
              };
            })(msg[6]));
            //hospitalaElement.addEventListener('click', function() {
              //hospital(msg[6]);
            //});
            //hospitalaElement.addEventListener('click', () => hospital(msg[6]));
            //hospitalaElement.setAttribute('onclick', 'hospital('+msg[6]+')');
            divElement = document.createElement('div');
            divElement.setAttribute('id', unique);
            console.log(msg[6]);
            divElement.className = 'dnd';
            firstPTag = document.createElement('p');
            firstPTag.textContent = msg[0];
            secondPTag = document.createElement('p');
            secondPTag.textContent = msg[3];
            thirdPTag = document.createElement('p');
            thirdPTag.textContent = `${msg[4]}, ${msg[5]}`;
            divElement.appendChild(firstPTag);
            divElement.appendChild(secondPTag);
            divElement.appendChild(thirdPTag);
            hospitalaElement.appendChild(divElement);
            newRow = table.insertRow();
            newCell = newRow.insertCell();
            newCell.appendChild(hospitalaElement);
            //messages=messages+"<tr><td> <a id='"+msg[6]+"' href='#searchdiv' onclick='hospital(this.id)'><div id='" + unique +"' class='dnd'><p>"+msg[0]+"</p><p>"+msg[3]+"</p><p>"+msg[4]+", "+msg[5]+"</p></div></a></td></tr>";
          }
        let messages = new XMLSerializer().serializeToString(table);
        localStorage.setItem("pid", pid[7]);
        localStorage.setItem("messages", messages);
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
};
const showabout = () => {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  let pid = localStorage.getItem("pid");
  document.getElementById("namemsg").innerHTML="<br><h2>"+data[1]+"</h2>";
  document.getElementById("detailmsg").innerHTML="<p>Address: "+data[2]+"</p><p>Phone: "+data[6]+"</p><p>Website: "+data[7]+"</p><p>Rating: "+data[8]+"</p>";
  document.getElementById("framemsg").innerHTML="<iframe width='450' height='250' frameborder='0' style='border:0' referrerpolicy='no-referrer-when-downgrade' src='"+config.gembedurl+config.apikey+"&origin=place_id:"+pid+"&destination=place_id:"+data[0]+"' allowfullscreen></iframe>";
  document.getElementById("aboutmsg").style.display = "block";
};
function YourComponent() {
  useEffect(() => {
    suggesthosp();
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
}, []);





const shownr = (i) => {
  let token = localStorage.getItem("token");
  let data = { 'token': token };
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




const suggesthosp = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/get_all_hospitals", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4){
      if(xhttp.status==200){
        let data = JSON.parse(xhttp.responseText).data;
        let msg=[];
        for (let i=0;i<data.length;i++){
          msg.push(data[i][1]);
        }
        autocomplete(document.getElementById("hospinput"), msg);
      }
    }
  };

};
const departdrop = () => {
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
        for (let i=0;i<data.length;i++){
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
              for (let i=0;i<data.length;i++){
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
};



const autocomplete = (inp, arr) => {
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
};














let Xpasslength=5;

  


  return (
    <div className="App">
      <NavigationSection />
      <HeroSection />
      <SearchSection />
      <AboutSection /> 
      <AppointmentSection /> 
      <TestimonialSection /> 
      <BlogSection />
    </div>
  );
};

export { showprofile, showwelcome, searchhospital };

export default YourComponent;