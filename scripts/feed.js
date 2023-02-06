document.addEventListener("DOMContentLoaded", function() {

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

                if(userData.role === "Seller")
                {
                    addForm.hidden = false;
                }

            }
        }
    }

 });

let imageData = "";

const productImage = document.getElementById("pimage");
productImage.addEventListener('change', (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.addEventListener('load', () => {
        imageData = reader.result;
        const pimageprev = document.getElementById("pimage-preview");
        pimageprev.setAttribute("src", imageData);
        pimageprev.hidden = false;
    });

});

let addBtn = document.getElementById("addProduct-submit");
let addForm = document.getElementById("addProduct-form");
let addMsg = document.getElementById("AddP-ok");
addBtn.addEventListener("click" , (e)=> {
    e.preventDefault();

    const name = addForm.productName.value;
    const price = parseInt(addForm.productPrice.value);
    const description = addForm.productDescription.value;
    const stock = parseInt(addForm.productStock.value);
    const tags = addForm.productTag.value.replace(/\s/g, "").split(",");

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {

        const db = event.target.result;

        const txn = db.transaction('Products', 'readwrite');
        const store = txn.objectStore('Products');

        let query = store.get(name);

        query.onsuccess = (event) => {
            productData = event.target.result;

            if(productData)
            {
                addMsg.hidden = false;
                addMsg.textContent = "This product name already exists !";

                setTimeout(() => {
                    addMsg.hidden = true;
                }, 2000);
            }
            else
            {
                query = store.put({
                    name: name,
                    imgsrc: imageData,
                    price: price,
                    description: description,
                    stock: stock,
                    tag: tags
                });
        
                query.onsuccess = function (event) {
                    addMsg.hidden = false;
                    addMsg.textContent = "You have successfully added new product !";
        
                    setTimeout(() => {
                        addMsg.hidden = true;
                    }, 2000);
                };
        
                query.onerror = function (event) {
                    addMsg.hidden = false;
                    addMsg.textContent = "An error has occured, please try again";
        
                    setTimeout(() => {
                        addMsg.hidden = true;
                    }, 2000);
                };
            }
        }
    }
});