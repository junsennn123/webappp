document.addEventListener("readystatechange", function() {

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];

        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {
            const db = event.target.result;

            const txn = db.transaction('Users','readonly');
            const store = txn.objectStore('Users');

            let query = store.get(sessionStorage.getItem("userData"));

            query.onsuccess = (event) => {
                userData = event.target.result;

                //let navbar = document.getElementById("navbar");
                //let li = document.createElement("li");
                    
                if(userData.role === "Seller")
                {
                    /*
                    let aref = document.createElement("a");
                    aref.href = "addproduct.html";
                    aref.textContent = "Add Product";
                    li.appendChild(aref);
                    navbar.appendChild(li);
                    */

                    let addPNavBar = document.getElementById("addPNavBar");
                    addPNavBar.style.display = "initial";

                }
                else if(userData.role === "Admin")
                {
                    /*
                    let aref = document.createElement("a");
                    aref.href = "admin.html";
                    aref.textContent = "Admin";
                    li.appendChild(aref);
                    navbar.appendChild(li);
                    */

                    

                    let adminNavBar = document.getElementById("adminNavBar");
                    adminNavBar.style.display = "initial";

                }

                

            }
        }

    }

 });
