document.addEventListener("DOMContentLoaded", function() {

    // Load all product name + img from DB first

    //let productList = [];

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;

        const txn = db.transaction('Products','readonly');
        const store = txn.objectStore('Products');


        let theDiv = document.getElementById("ShopList");
        theDiv.style.display = "flex";
        theDiv.style.flexWrap = "wrap";

        let firstCol = document.createElement("div");
        firstCol.setAttribute("class","productColumn");
        firstCol.style.flex = "50%";

        let secCol = document.createElement("div");
        secCol.setAttribute("class","productColumn");
        secCol.style.flex = "50%";

        let count = 1;

        store.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                let product = cursor.value;
                //console.log(product);

                //productList.push(product);

                // continue next record
                cursor.continue();

                let col = count%2? firstCol : secCol;
                count++;

                let name = document.createElement("p");
                name.textContent = product.name ;
                name.style.fontSize = "30px";
                name.style.color = "yellow";

                col.appendChild(name);

                // adding image and setting link to each one.
                let img = document.createElement("img");
                img.addEventListener("click", (e)=> {
                    //console.log(e.currentTarget.getAttribute("product-value"));
                    document.location.href = "product.html?value=" + product.name ; //+ "&Img-link=" + e.currentTarget.getAttribute("Img-link");
                    //console.log(e.currentTarget.tagName);
                });
                img.src = product.imgsrc ;
                img.style.marginTop = "-30px";


                //img.width = "100px";

                col.appendChild(img);

            }
        };

        theDiv.append(firstCol);
        theDiv.append(secCol);

    }

 });