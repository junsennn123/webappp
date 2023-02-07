let adminDiv = document.getElementById("adminDiv");

document.addEventListener("DOMContentLoaded", function() {

    if (document.cookie)
    {
        // Show all the users with details

        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {
            const db = event.target.result;

            const txn = db.transaction('Users','readonly');
            const store = txn.objectStore('Users');

            //let query = store.get(sessionStorage.getItem("userData"));

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
            th.colSpan = "5";

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

            let deleteH = document.createElement("td");
            deleteH.textContent = "Delete" ;

            trH.appendChild(nameH);
            trH.appendChild(emailH);
            trH.appendChild(passwordH);
            trH.appendChild(roleH);
            trH.appendChild(deleteH);

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
                    //name.textContent = users.name ;

                    let email = document.createElement("td");
                    email.textContent = users.email ;

                    let password = document.createElement("td");
                    let passwordinput = document.createElement("input");
                    passwordinput.type = "password";
                    passwordinput.value = users.password;
                    password.appendChild(passwordinput);
                    //password.textContent = users.password ;

                    let role = document.createElement("td");
                    let roleinput = document.createElement("select");

                    roleinput.onchange = function () {
                        console.log(roleinput.options[roleinput.selectedIndex].text);
                    };

                    let optionUser = document.createElement("option");
                    optionUser.textContent = "User";
                    optionUser.selected = "User" === users.role;
                    let optionSeller = document.createElement("option");
                    optionSeller.textContent = "Seller";
                    optionSeller.selected = "Seller" === users.role;
                    let optionAdmin = document.createElement("option");
                    optionAdmin.textContent = "Admin";
                    optionAdmin.selected = "Admin" === users.role;

                    roleinput.appendChild(optionUser);
                    roleinput.appendChild(optionSeller);
                    roleinput.appendChild(optionAdmin);
                    role.appendChild(roleinput);
                    //role.textContent = users.role ;

                    let deleteButtonTD = document.createElement("td");
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = `Delete ${users.name}`;

                    deleteButton.addEventListener("click" , (e)=> {
                        
                        const deleteUtxn = db.transaction('Users', 'readwrite');
                        const deleteUstore = deleteUtxn.objectStore('Users');
                        let deleteQuery = deleteUstore.delete(users.email);

                        deleteQuery.onsuccess = (event) => {
                            alert(`${users.name}\'s account has been deleted`);
                            setTimeout(() => {
                                document.location.reload();
                            }, 1000);
                        };
                    });
                    deleteButtonTD.appendChild(deleteButton);


                    tr.appendChild(name);
                    tr.appendChild(email);
                    tr.appendChild(password);
                    tr.appendChild(role);
                    tr.append(deleteButtonTD);

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
            thP.colSpan = "6";

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

            let deletePH = document.createElement("td");
            deletePH.textContent = "Delete" ;

            trH.appendChild(nameH);
            trH.appendChild(priceH);
            trH.appendChild(descriptionH);
            trH.appendChild(stockH);
            //trH.appendChild(imgsrcH);
            trH.appendChild(tagsH);
            trH.appendChild(deletePH);

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
                    let priceinput = document.createElement("input");
                    priceinput.type = "number";
                    priceinput.value = product.price;
                    price.appendChild(priceinput);
                    //price.textContent = product.price ;

                    let description = document.createElement("td");
                    let descriptioninput = document.createElement("input");
                    descriptioninput.type = "text";
                    descriptioninput.value = product.description;
                    description.appendChild(descriptioninput);
                    //description.textContent = product.description ;

                    let stock = document.createElement("td");
                    let stockinput = document.createElement("input");
                    stockinput.type = "number";
                    stockinput.value = product.stock;
                    stock.appendChild(stockinput);
                    //stock.textContent = product.stock ;

                    /*
                    let imgsrc = document.createElement("td");
                    imgsrc.textContent = product.imgsrc ;
                    */

                    let tags = document.createElement("td");
                    tags.textContent = product.tag ;


                    let deletePButtonTD = document.createElement("td");
                    let deletePButton = document.createElement("button");
                    deletePButton.textContent = `Delete ${product.name}`;

                    deletePButton.addEventListener("click" , (e)=> {
                        
                        const deletePtxn = db.transaction('Products', 'readwrite');
                        const deletePstore = deletePtxn.objectStore('Products');
                        let deletePQuery = deletePstore.delete(product.name);

                        deletePQuery.onsuccess = (event) => {
                            alert(`Product ${product.name} has been deleted`);
                            setTimeout(() => {
                                document.location.reload();
                            }, 1000);
                        };
                    });
                    deletePButtonTD.appendChild(deletePButton);


                    tr.appendChild(name);
                    tr.appendChild(price);
                    tr.appendChild(description);
                    tr.appendChild(stock);
                    //tr.appendChild(imgsrc);
                    tr.appendChild(tags);
                    tr.appendChild(deletePButtonTD);

                    newTbodyP.appendChild(tr);

                }
            };

        }, 100);

        }




    }

 });