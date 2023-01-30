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