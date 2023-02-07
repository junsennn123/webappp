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

let productName = document.getElementById("Product-name");
let productImage = document.getElementById("Product-image");

document.addEventListener("DOMContentLoaded", function() {
    //let productEle = document.getElementsByClassName("Product");
    
    let value = GetURLParameter("value");

    let productDescription = document.getElementById("Product-description");
    let productPrice = document.getElementById("Product-price");
    
    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;

        const txn = db.transaction('Products','readonly');
        const store = txn.objectStore('Products');

        let query = store.get(value);

        query.onsuccess = (event) => {
            productData = event.target.result;
            console.log(productData);

            productName.textContent = productData.name;
            productDescription.textContent = productData.description;
            productImage.setAttribute("src", productData.imgsrc);
            productPrice.textContent = "Price: $" + productData.price.toString();
        }

    }

 });

 let openCartBtn = document.getElementById("addCartPanel");
 openCartBtn.addEventListener("click", (e)=> {
    
    let cartPanel = document.getElementById("cartPanel");

    cartPanel.hidden = false;

    document.getElementById("cart-name").textContent = "Add " + productName.textContent + " to the cart";
    document.getElementById("cartImage").src = productImage.getAttribute("src");
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

    let Quantity = parseInt(document.getElementById("Quant").value);

    console.log(typeof Quantity);
    console.log(Quantity);

    if(!Quantity || Quantity < 1)
    {
        cartMsg.textContent = "Quantity cannot be lesser than 1";
    }
    else if (document.cookie)
    {
        // connect to DB and update 
        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {

            const db = event.target.result;

            const txn = db.transaction('Users', 'readwrite');

            const store = txn.objectStore('Users');

            let getUserData = store.get(sessionStorage.getItem("userData"));

            getUserData.onsuccess = (event) => {
                userData = event.target.result;
                
                console.log(userData);

                if (productName.textContent in userData.cart )
                {
                    userData.cart[productName.textContent] += Quantity;
                }
                else
                {
                    userData.cart[productName.textContent] = Quantity;
                }

                let query = store.put(userData);

                query.onsuccess = function (event) {
                    console.log(event);

                    cartMsg.textContent = "Successfully added to cart !";
            
                    setTimeout(() => {
                        cartMsg.hidden = true;
                        let cartPanel = document.getElementById("cartPanel");
                        cartPanel.hidden = true;
                    }, 1000);
                };

                query.onerror = function (event) {
                    console.log(event.target.errorCode);

                    cartMsg.textContent = "Something went wrong";
                };
            }
        }
    }
    else
    {
        cartMsg.textContent = "Please login first!";
    }

 });




 /***************************** CREATING PRODUCT DATABASE ************************************/
 /*
 (function () {
    const request = indexedDB.open("ShoppingApp",3);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);  
    };

    request.onupgradeneeded = (event) => {

        let db = event.target.result;

        let store = db.createObjectStore('Products', {
            keyPath: 'name',
            autoIncrement: true
        });

        let index = store.createIndex('name','name',{
            unique: true
        });
    }

    request.onsuccess = (event) => {

        const db = event.target.result;
        insertUser(db, {
            name: 'Table',
            imgsrc: 'image/table.png',
            price: 29.90,
            description: 'Table for putting other stuff. Level up your platform.',
            stock: 100,
            tag: ["Furniture"]
        });

        insertUser(db, {
            name: 'Lamp',
            imgsrc: 'image/lamp.png',
            price: 19.90,
            description: 'Brighten up your life.',
            stock: 200,
            tag: ["Furniture"]
        });

        insertUser(db, {
            name: 'Shelf',
            imgsrc: 'image/shelf.png',
            price: 24.90,
            description: 'Display a bunch of stuff you wont use',
            stock: 100,
            tag: ["Furniture","Storage"]
        });

        insertUser(db, {
            name: 'Chair',
            imgsrc: 'image/chair.png',
            price: 9.90,
            description: 'For sitting, to sit down and enjoy life',
            stock: 100,
            tag: ["Furniture"]
        });

        insertUser(db, {
            name: 'Trolley',
            imgsrc: 'image/trolley.png',
            price: 59.90,
            description: 'Put stuff inside and roll away',
            stock: 50,
            tag: ["Storage"]
        });

        //getUserByEmail(db, "admin@admin.com");

        db.close();
    }

    function insertUser(db, user){

        const txn = db.transaction('Products', 'readwrite');

        const store = txn.objectStore('Products');

        let query = store.put(user);

        query.onsuccess = function (event) {
            console.log(event);
            console.log("nice");
        };

        query.onerror = function (event) {
            console.log(event.target.errorCode);
            console.log("not nice");
        };

    }

    function getUserByEmail(db, email){

        const txn = db.transaction('Products','readonly');
        const store = txn.objectStore('Products');

        const index = store.index('name');

        let query = index.get(email);

        query.onsuccess = (event) => {
            console.log(query.result);
        };

        query.onerror = (event) => {
            console.log(event.target.errorCode);
        }


    }

})();
*/