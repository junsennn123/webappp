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

 let openCartBtn = document.getElementById("addCartPanel");

 openCartBtn.addEventListener("click", (e)=> {
    
    let cartPanel = document.getElementById("cartPanel");

    cartPanel.hidden = false;

    document.getElementById("cart-name").textContent = "Add " + GetURLParameter("value") + " to the cart";
    document.getElementById("cartImage").src = GetURLParameter("Img-link");
 });

 let closeCartBtn = document.getElementById("closeCart");

 closeCartBtn.addEventListener("click", (e)=> {
    
    let cartPanel = document.getElementById("cartPanel");
    cartPanel.hidden = true;

    let cartMsg = document.getElementById("cartLogin");
    cartMsg.hidden = true;
 });

 let addCartBtn = document.getElementById("addItemToCart");
 addCartBtn.addEventListener("click", (e)=> {
    
    let cartMsg = document.getElementById("cartLogin");
    cartMsg.hidden = false;

    console.log(document.getElementById("Quant").value);

    if(document.getElementById("Quant").value < 1)
    {
        cartMsg.textContent = "Quantity cannot be lesser than 1";
    }
    else if (document.cookie)
    {
        cartMsg.textContent = "Successfully added to cart !";
        
        setTimeout(() => {
            cartMsg.hidden = true;
            let cartPanel = document.getElementById("cartPanel");
            cartPanel.hidden = true;
        }, 1000);
    }
    else
    {
        cartMsg.textContent = "Please login first!";
    }

 });