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

    // Load all product name + img from DB first

    //let productList = [];

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;

        const txn = db.transaction('Products','readonly');
        const store = txn.objectStore('Products');

        store.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                let product = cursor.value;
                //console.log(product);

                //productList.push(product);

                // continue next record
                cursor.continue();

                let theDiv = document.getElementById("ShopList");

                let name = document.createElement("p");
                name.textContent = product.name ;

                theDiv.appendChild(name);

                let img = document.createElement("img");
                img.addEventListener("click", (e)=> {
                    //console.log(e.currentTarget.getAttribute("product-value"));
                    document.location.href = "product.html?value=" + product.name ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
                    //console.log(e.currentTarget.tagName);
                });
                img.src = product.imgsrc ;

                theDiv.appendChild(img);

            }
        };

        // create all the elements needed

        /*
        console.log("run");
        let theDiv = document.getElementById("ShopList");

        for(let i = 0; i < productList.length; i++)
        {
            console.log("run2");
            let name = document.createAttribute("span");
            name.textContent = productList[i].name ;

            theDiv.appendChild(name);

            let img = document.createAttribute("img");
            img.src = productList[i].imgsrc ;

            theDiv.appendChild(img);


        }
        */

    }

    


    // Redirect to product page on click
    var allProducts = document.querySelectorAll(".ProductImg");
    for(i = 0; i < allProducts.length; i++) {

        allProducts[i].addEventListener("click", (e)=> {
            //console.log(e.currentTarget.getAttribute("product-value"));
            document.location.href = "product.html?value=" + e.currentTarget.getAttribute("product-value") ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
            //console.log(e.currentTarget.tagName);
        });
    }



    // Set the name after login 
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