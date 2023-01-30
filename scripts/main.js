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
    var allProducts = document.querySelectorAll(".ProductImg");
    for(i = 0; i < allProducts.length; i++) {
        var value = allProducts[i].getAttribute("product-value");
        var value2 = allProducts[i].getAttribute("Img-link");

        console.log(value,value2);

        

        allProducts[i].addEventListener("click", function() {
            document.location.href = "product.html?value=" + value + "&Img-link=" + value2;
        });
    }


    console.log("done");

 });