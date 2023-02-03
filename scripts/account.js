let accountForm = document.getElementById("account-form");
let submitBtn = document.getElementById("account-edit");
let saveMsg = document.getElementById("save-ok");

let nameshow = document.getElementById("RegLog-name");

document.addEventListener("DOMContentLoaded", function() {

    let cookies = document.cookie;

    let mainDiv = document.getElementById("account-details");

    if (cookies)
    {
        // set name for top right 
        let wholecookie = decodeURIComponent(cookies).split(",");
        nameshow.textContent = wholecookie[0].split("=")[1];


        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {

            const db = event.target.result;
            const txn = db.transaction('Users', 'readwrite');
            const store = txn.objectStore('Users');

            let getUserData = store.get(sessionStorage.getItem("userData"));

            getUserData.onsuccess = (event) => {
                userData = event.target.result;

                accountForm.hidden = false;

                accountForm.usermail.value = userData.email;
                accountForm.password.value = userData.password;
                accountForm.username.value = userData.name;
            }

        };
    }
    else
    {
        let loginPlease = document.createElement("p");
        loginPlease.textContent = "Please login first ";
        loginPlease.style.fontSize = "40px";
        loginPlease.style.color = "red";

        mainDiv.appendChild(loginPlease);
    }

 });

 submitBtn.addEventListener("click" , (e)=> {
    e.preventDefault();

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;
        const txn = db.transaction('Users', 'readwrite');
        const store = txn.objectStore('Users');

        let getUserData = store.get(sessionStorage.getItem("userData"));

        getUserData.onsuccess = (event) => {
            userData = event.target.result;

            userData.name = accountForm.username.value;
            userData.password = accountForm.password.value;

            const edittxn = db.transaction('Users', 'readwrite');
            const editstore = edittxn.objectStore('Users');

            let updateAccount = editstore.put(userData);

            updateAccount.onsuccess = (event) => {
                saveMsg.hidden = false;

                setTimeout(() => {
                    saveMsg.hidden = true;
                }, 2000);

                document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                document.cookie = `name=${encodeURIComponent(userData.name)};max-age=${60*60};path=/`;
                nameshow.textContent = userData.name;

            };



        }

    }

        
});