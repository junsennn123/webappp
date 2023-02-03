let cartList = []

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

                            cartList.push([product,userData.cart[product.name]]);
                            
                            // adding image and setting link to each one.
                            let img = document.createElement("img");
                            img.addEventListener("click", (e)=> {
                                //console.log(e.currentTarget.getAttribute("product-value"));
                                document.location.href = "product.html?value=" + product.name ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
                                //console.log(e.currentTarget.tagName);
                            });
                            img.src = product.imgsrc ;
                            img.style.marginBottom = "-30px";
                            img.style.display = "block";

                            let name = document.createElement("p");
                            name.textContent = product.name  ;
                            name.style.fontSize = "30px";
                            name.style.color = "yellow";
                            //name.style.display = "inline-block";

                            /*
                            let Quantity = document.createElement("p");
                            Quantity.textContent = "x " + userData.cart[product.name] ;
                            Quantity.style.fontSize = "30px";
                            Quantity.style.color = "red";
                            Quantity.style.display = "inline-block";
                            */

                            let EPrice = document.createElement("p");
                            EPrice.textContent = "$ " + product.price + " x ";
                            EPrice.style.fontSize = "30px";
                            EPrice.style.color = "gold";
                            EPrice.style.display = "inline-block";
                            EPrice.style.marginTop = "-30px";
                            EPrice.id = `${product.name}-eprice`;

                            let Quantity = document.createElement("input");
                            Quantity.type = "number";
                            Quantity.value = userData.cart[product.name] ;
                            Quantity.style.fontSize = "30px";
                            Quantity.style.color = "red";
                            Quantity.style.display = "inline-block";
                            Quantity.id = `${product.name}-quant`;
                            Quantity.min = 0;
                            Quantity.style.marginTop = "-30px";
                            Quantity.style.width = "80px";

                            //<input id="number" type="number" value="42" />
                            
                            

                            /*for( let i = 0 ; i < cartList.length; i++)
                            {
                                $(`#${cartList[i][0].name}-quant`).onchange(function () {
                                    if ($(this).data('old-value') != $(this).val()) {
                                        alert(cartList[i][0].name);
                                    } 
                                    $(this).data('old-value', $(this).val());
                                })

                            }*/
                            
                            let TPrice = document.createElement("p");
                            TPrice.textContent = "= $ " + userData.cart[product.name] * product.price ;
                            TPrice.style.fontSize = "30px";
                            TPrice.style.color = "gold";
                            TPrice.style.display = "inline-block";
                            TPrice.style.marginTop = "-30px";
                            TPrice.id = `${product.name}-tprice`;

                            theDiv.appendChild(img);
                            theDiv.appendChild(name);
                            theDiv.appendChild(EPrice);
                            theDiv.appendChild(Quantity);
                            theDiv.appendChild(TPrice);

                            Quantity.onchange = function() {
                                TPrice.textContent = "= $ " + Quantity.value * product.price ;

                                userData.cart[product.name] = parseInt(Quantity.value);
                                
                                const uctxn = db.transaction('Users', 'readwrite');
                                const ucstore = uctxn.objectStore('Users');
                                let updateCart = ucstore.put(userData);

                                updateCart.onsuccess = (event) => {
                                    console.log(event);
                                };

                            };

                            //img.width = "100px";
                            
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