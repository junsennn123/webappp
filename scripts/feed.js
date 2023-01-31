document.addEventListener("DOMContentLoaded", function() {

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];
    }

 });