function SignUp() {
    let loginP = document.getElementById("loginPanel");
    let RegP = document.getElementById("Register");

    loginP.hidden = true;
    RegP.hidden = false;

}

function BackToLogin() {
    let loginP = document.getElementById("loginPanel");
    let RegP = document.getElementById("Register");

    loginP.hidden = false;
    RegP.hidden = true;

}

let loginBtn = document.getElementById("login-submit");
let loginForm = document.getElementById("login-form");
let invalidLogin = document.getElementById("invalid-up");

loginBtn.addEventListener("click" , (e)=> {
    e.preventDefault();

    const usermail = loginForm.usermail.value;
    const password = loginForm.password.value;

    if (usermail !== "asdf@asdf")
    {
        invalidLogin.hidden = false;
    }
    else
    {
        document.cookie = "name=${encodeURIComponent('Jun Sen')}; max-age=${60*60}; path=/";
        console.log(document.cookie);
        //document.location.href = "index.html";
    }



});