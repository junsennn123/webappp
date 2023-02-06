let adminDiv = document.getElementById("adminDiv");

document.addEventListener("DOMContentLoaded", function() {

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];


        // Show all the users with details

        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {
            const db = event.target.result;

            const txn = db.transaction('Users','readonly');
            const store = txn.objectStore('Users');

            let query = store.get(sessionStorage.getItem("userData"));

            /*
            query.onsuccess = (event) => {
                userData = event.target.result;

                if(userData)
                    adminDiv.hidden = false;
                else
                    adminDiv.hidden = true;

            }*/


            let newTable = document.createElement("table");
            adminDiv.appendChild(newTable);

            let thead = document.createElement("thead");
            let th = document.createElement("th");
            th.textContent = "Users";

            thead.appendChild(th);
            newTable.appendChild(thead);
            
            let newTbody = document.createElement("tbody");
            newTable.appendChild(newTbody);

            let trH = document.createElement("tr");

            let nameH = document.createElement("td");
            nameH.textContent = "Name" ;

            let emailH = document.createElement("td");
            emailH.textContent = "Email" ;

            let passwordH = document.createElement("td");
            passwordH.textContent = "Password" ;

            let roleH = document.createElement("td");
            roleH.textContent = "Role" ;

            trH.appendChild(nameH);
            trH.appendChild(emailH);
            trH.appendChild(passwordH);
            trH.appendChild(roleH);

            newTbody.appendChild(trH);


            store.openCursor().onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    let users = cursor.value;

                    // continue next record
                    cursor.continue();

                    let tr = document.createElement("tr");

                    let name = document.createElement("td");
                    let nameinput = document.createElement("input");
                    nameinput.type = "text";
                    nameinput.value = users.name;
                    name.appendChild(nameinput);

                    let email = document.createElement("td");
                    email.textContent = users.email ;

                    let password = document.createElement("td");
                    password.textContent = users.password ;

                    let role = document.createElement("td");
                    role.textContent = users.role ;

                    tr.appendChild(name);
                    tr.appendChild(email);
                    tr.appendChild(password);
                    tr.appendChild(role);

                    newTbody.appendChild(tr);

                }
            };

            setTimeout(() => {        
            const Ptxn = db.transaction('Products','readonly');
            const Pstore = Ptxn.objectStore('Products');

            let newTableP = document.createElement("table");
            adminDiv.appendChild(newTableP);

            let theadP = document.createElement("thead");
            let thP = document.createElement("th");
            thP.textContent = "Products";

            theadP.appendChild(thP);
            newTableP.appendChild(theadP);
            
            let newTbodyP = document.createElement("tbody");
            newTableP.appendChild(newTbodyP);

            let trH = document.createElement("tr");

            let nameH = document.createElement("td");
            nameH.textContent = "Name" ;

            let priceH = document.createElement("td");
            priceH.textContent = "Price" ;

            let descriptionH = document.createElement("td");
            descriptionH.textContent = "Description" ;

            let stockH = document.createElement("td");
            stockH.textContent = "Stocks" ;
            
            /*
            let imgsrcH = document.createElement("td");
            imgsrcH.textContent = "Image Source";
            */

            let tagsH = document.createElement("td");
            tagsH.textContent = "Tags" ;

            trH.appendChild(nameH);
            trH.appendChild(priceH);
            trH.appendChild(descriptionH);
            trH.appendChild(stockH);
            //trH.appendChild(imgsrcH);
            trH.appendChild(tagsH);

            newTbodyP.appendChild(trH);

            Pstore.openCursor().onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    let product = cursor.value;

                    // continue next record
                    cursor.continue();

                    let tr = document.createElement("tr");

                    let name = document.createElement("td");
                    name.textContent = product.name ;

                    let price = document.createElement("td");
                    price.textContent = product.price ;

                    let description = document.createElement("td");
                    description.textContent = product.description ;

                    let stock = document.createElement("td");
                    stock.textContent = product.stock ;

                    /*
                    let imgsrc = document.createElement("td");
                    imgsrc.textContent = product.imgsrc ;
                    */

                    let tags = document.createElement("td");
                    tags.textContent = product.tag ;

                    tr.appendChild(name);
                    tr.appendChild(price);
                    tr.appendChild(description);
                    tr.appendChild(stock);
                    //tr.appendChild(imgsrc);
                    tr.appendChild(tags);

                    newTbodyP.appendChild(tr);

                }
            };

        }, 100);

        }




    }

 });