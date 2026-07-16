const form=document.getElementById("appointmentForm");

let passwordAttempt=0;

form.addEventListener("submit",function(event){

event.preventDefault();

document.querySelectorAll(".error").forEach(function(item){

item.innerHTML="";
});

document.getElementById("successMessage").innerHTML="";

let valid=true;

let fname=document.getElementById("fname").value.trim();
let lname=document.getElementById("lname").value.trim();
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value;
let confirm=document.getElementById("confirmPassword").value;
let department=document.getElementById("department").value;
let description=document.getElementById("description").value.trim();

let namePattern=/^[A-Za-z]+$/;
let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(fname==""){

document.getElementById("fnameError").innerHTML="First Name Required";
valid=false;

}
else if(!namePattern.test(fname)){

document.getElementById("fnameError").innerHTML="Only Alphabets";
valid=false;

}

if(lname==""){

document.getElementById("lnameError").innerHTML="Last Name Required";
valid=false;

}
else if(!namePattern.test(lname)){

document.getElementById("lnameError").innerHTML="Only Alphabets";
valid=false;

}

if(email==""){

document.getElementById("emailError").innerHTML="Email Required";
valid=false;

}
else if(!emailPattern.test(email)){

document.getElementById("emailError").innerHTML="Invalid Email";
valid=false;

}

if(password!=confirm){

passwordAttempt++;

document.getElementById("passwordError").innerHTML="Password Doesn't Match";

valid=false;

if(passwordAttempt>=3){

alert("Maximum Password Attempt Reached");

form.querySelector("button").disabled=true;

}

}

let gender=document.querySelector('input[name="gender"]:checked');

if(!gender){

document.getElementById("genderError").innerHTML="Select Gender";

valid=false;

}

let service=document.querySelectorAll('input[name="service"]:checked');

if(service.length==0){

document.getElementById("serviceError").innerHTML="Select At Least One Service";

valid=false;

}

if(department==""){

document.getElementById("departmentError").innerHTML="Select Department";

valid=false;

}

if(description.length<20){

document.getElementById("descriptionError").innerHTML="Minimum 20 Characters";

valid=false;

}

if(valid){

document.getElementById("successMessage").innerHTML="Appointment Registration Completed Successfully!";

}

});