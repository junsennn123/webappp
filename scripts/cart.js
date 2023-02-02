document.addEventListener("DOMContentLoaded", function() {

    let nameshow = document.getElementById("RegLog-name");

    let theDiv = document.getElementById("cart");

    if (document.cookie)
    {
        let wholecookie = decodeURIComponent(document.cookie).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];

        // connect to DB and update 
        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {

            const db = event.target.result;
            const txn = db.transaction('Users', 'readwrite');
            const store = txn.objectStore('Users');

            let getUserData = store.get(sessionStorage.getItem("userData"));

            getUserData.onsuccess = (event) => {
                userData = event.target.result;
                
                console.log(userData.cart);

                const txnP = db.transaction('Products','readonly');
                const storeP = txnP.objectStore('Products');

                let productCount = 0;

                let empty = document.createElement("p");
                empty.textContent = "Your cart is empty";
                empty.style.fontSize = "30px";
                empty.style.color = "green";

                theDiv.appendChild(empty);

                storeP.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result;
                    if (cursor) {
                        let product = cursor.value;
                        //console.log(product);

                        //productList.push(product);

                        // continue next record
                        cursor.continue();

                        if (product.name in userData.cart && userData.cart[product.name] > 0)
                        {
                            if(empty)
                            {
                                theDiv.removeChild(empty);
                                empty = null;
                            }
                            
                            let name = document.createElement("p");
                            name.textContent = product.name ;
                            name.style.fontSize = "30px";
                            name.style.color = "yellow";
                            name.style.display = "inline-block";

                            let Quantity = document.createElement("p");
                            Quantity.textContent = "x " + userData.cart[product.name] ;
                            Quantity.style.fontSize = "30px";
                            Quantity.style.color = "red";
                            Quantity.style.display = "inline-block";

                            let TPrice = document.createElement("p");
                            TPrice.textContent = "=$ " + userData.cart[product.name] * product.price ;
                            TPrice.style.fontSize = "30px";
                            TPrice.style.color = "gold";
                            TPrice.style.display = "inline-block";

                            theDiv.appendChild(name);
                            theDiv.appendChild(Quantity);
                            theDiv.appendChild(TPrice);

                            // adding image and setting link to each one.
                            let img = document.createElement("img");
                            img.addEventListener("click", (e)=> {
                                //console.log(e.currentTarget.getAttribute("product-value"));
                                document.location.href = "product.html?value=" + product.name ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
                                //console.log(e.currentTarget.tagName);
                            });
                            img.src = product.imgsrc ;
                            img.style.marginTop = "-30px";
                            img.style.display = "block";


                            //img.width = "100px";

                            theDiv.appendChild(img);
                            productCount += 1;
                        }

                    }
                };
            }
        }
    }
    else
    {
        let loginPlease = document.createElement("p");
        loginPlease.textContent = "Please login first ";
        loginPlease.style.fontSize = "40px";
        loginPlease.style.color = "red";

        theDiv.appendChild(loginPlease);
    }

 });

 