let accountForm = document.getElementById("account-form");
let submitBtn = document.getElementById("account-edit");
let saveMsg = document.getElementById("save-ok");

document.addEventListener("readystatechange", function() {

    let mainDiv = document.getElementById("account-details");

    if (document.cookie)
    {
        // set name for top right 
        const request = indexedDB.open("ShoppingApp");

        request.onsuccess = (event) => {

            const db = event.target.result;
            const txn = db.transaction('Users', 'readwrite');
            const store = txn.objectStore('Users');

            let getUserData = store.get(sessionStorage.getItem("userData"));

            getUserData.onsuccess = (event) => {
                userData = event.target.result;

                accountForm.hidden = false;

                //accountForm.usermail.value = userData.email;
                accountForm.password.value = userData.password;
                accountForm.username.value = userData.name;
            }

        };
    }
    else
    {
        let loginPlease = document.getElementById("loginFirst");
        loginPlease.hidden = false;
        loginPlease.textContent = "Please login first ";
        loginPlease.style.fontSize = "40px";
        loginPlease.style.color = "red";

    }

 });

 accountForm.onsubmit = function(e){
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

        
};