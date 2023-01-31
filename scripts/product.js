function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) 
        {
            return sParameterName[1];
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //let productEle = document.getElementsByClassName("Product");
    
    let value = GetURLParameter("value");
    let productImg = GetURLParameter("Img-link");

    console.log(value);
    console.log(productImg);

    let productName = document.getElementById("Product-name");
    let productImage = document.getElementById("Product-image");

    productName.textContent = value;
    productImage.setAttribute("src", productImg);

    console.log("done");

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];
    }

 });