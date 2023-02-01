/*
const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";

const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/cat.jpg") {
        myImage.setAttribute("src", "images/cat2.jpg");
    } else {
        myImage.setAttribute("src", "images/cat.jpg");
    }
};

let myButton = document.querySelector("button");

function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
        setUserName();
    } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `${myName}`;
    }
  }

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `${storedName}`;
}

myButton.onclick = () => {
    setUserName();
  };
  */

  document.addEventListener("DOMContentLoaded", function() {

    // Redirect to product page on click
    var allProducts = document.querySelectorAll(".ProductImg");
    for(i = 0; i < allProducts.length; i++) {

        allProducts[i].addEventListener("click", (e)=> {
            //console.log(e.currentTarget.getAttribute("product-value"));
            document.location.href = "product.html?value=" + e.currentTarget.getAttribute("product-value") ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
            //console.log(e.currentTarget.tagName);
        });
    }

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];
    }


    console.log("done");

 });