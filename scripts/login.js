function SignUp() {
    let loginP = document.getElementById("loginPanel");
    let RegP = document.getElementById("Register");

    loginP.hidden = true;
    RegP.hidden = false;

}

function BackToLogin() {
    let loginP = document.getElementById("loginPanel");
    let RegP = document.getElementById("Register");

    loginP.hidden = false;
    RegP.hidden = true;

}

let loginBtn = document.getElementById("login-submit");
let loginForm = document.getElementById("login-form");
let invalidLogin = document.getElementById("invalid-up");

loginBtn.addEventListener("click" , (e)=> {
    e.preventDefault();

    const usermail = loginForm.usermail.value;
    const password = loginForm.password.value;

    /*
    await checkValidUser(usermail).then((data)=> {
        console.log(data);
    });
    */

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;

        const txn = db.transaction('Users','readonly');
        const store = txn.objectStore('Users');

        let query = store.get(usermail);

        query.onsuccess = (event) => {
            userData = event.target.result;
            console.log(userData);

            if(!userData || userData.password !== password)
            {
                invalidLogin.hidden = false;
            }
            else if ( userData.password === password ) {

                document.cookie = `name=${encodeURIComponent(userData.name)};max-age=${60*60};path=/`;
                //console.log(document.cookie);
                document.location.href = "index.html";
                invalidLogin.hidden = true;
            }

        }

    }

});

let registerBtn = document.getElementById("register-submit");
let registerForm = document.getElementById("register-form");
let regMsg = document.getElementById("Reg-ok");
registerBtn.addEventListener("click" , (e)=> {
    e.preventDefault();

    const usermail = registerForm.usermail.value;
    const password = registerForm.password.value;
    const name = registerForm.username.value;

    /*
    await checkValidUser(usermail).then((data)=> {
        console.log(data);
    });
    */

    const request = indexedDB.open("ShoppingApp");

    request.onsuccess = (event) => {
        const db = event.target.result;

        const txn = db.transaction('Users', 'readwrite');

        const store = txn.objectStore('Users');

        let query = store.get(usermail);

        query.onsuccess = (event) => {
            userData = event.target.result;
            if(userData)
            {
                regMsg.hidden = false;
                regMsg.textContent = "The email already exists !";
            }
            else {

                query = store.put({
                    email: usermail,
                    password: password,
                    name: name,
                    role: 'User'
                });
        
                query.onsuccess = function (event) {
                    console.log(event);
        
                    regMsg.hidden = false;
                    regMsg.textContent = "You have successfully registered ! Bringing to main page in 2 seconds";

                    setTimeout(() => {
                        document.cookie = `name=${encodeURIComponent(name)};max-age=${60*60};path=/`;
                        //console.log(document.cookie);
                        document.location.href = "index.html";
                    }, 2000);
                    

                };
        
                query.onerror = function (event) {
                    console.log(event.target.errorCode);
        
                    regMsg.hidden = false;
                    regMsg.textContent = "Failed to register, please try again !";
                };

            }
        }

        
    }

});

let signout = document.getElementById("sign-out");

signout.addEventListener("click" , (e)=> {

    console.log("come in");
    
    //delete cookie
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    
    document.location.reload();

});

document.addEventListener("DOMContentLoaded", function() {

    let nameshow = document.getElementById("RegLog-name");

    console.log(document.cookie);

    let cookies = document.cookie;

    let loginP = document.getElementById("loginPanel");
    let RegP = document.getElementById("Register");

    if (cookies)
    {
        let wholecookie = decodeURIComponent(cookies).split(",");
        
        nameshow.textContent = wholecookie[0].split("=")[1];

        loginP.hidden = true;
        RegP.hidden = true;
        signout.hidden = false;
    }
    else
    {
        loginP.hidden = false;
        RegP.hidden = true;
        signout.hidden = true;
    }

 });

/***********************    TRYING ASYNC BUT NO WORK     ******************************/

/*
async function checkValidUser(email) {
    const request = indexedDB.open("ShoppingApp");
    let result = "";

    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        let store = db.createObjectStore('Users', {
            autoIncrement: true
        });

        let index = store.createIndex('email','email',{
            unique: true
        });

    };

    request.onerror = async (event) => {
        console.error(`Database error: ${event.target.errorCode}`);  
    };

    request.onsuccess = async (event) => {

        const db = event.target.result;
        let userData = await getUserByEmail(db, email);

        db.close();

        console.log("from here");
        console.log(userData);
        
    }

    return result;
}

async function getUserByEmail(db, email){

    const txn = db.transaction('Users','readonly');
    const store = txn.objectStore('Users');

    const index = store.index('email');

    let query = index.get(email);

    let result = "";

    query.onsuccess = (event) => {
        console.log("deep here");
        console.log(query.result);
        return query.result;
    };

    query.onerror = (event) => {
        return event.target.errorCode;
    }
}

function insertUser(db, user){

    const txn = db.transaction('Users', 'readwrite');

    const store = txn.objectStore('Users');

    let query = store.put(user);

    query.onsuccess = function (event) {
        console.log(event);
    };

    query.onerror = function (event) {
        console.log(event.target.errorCode);
    };

}
*/

//*********************** Add stuff to database *********************************************
/*
(function () {
    const request = indexedDB.open("ShoppingApp");

    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        let store = db.createObjectStore('Users', {
            keyPath: 'email',
            autoIncrement: true
        });

        let index = store.createIndex('email','email',{
            unique: true
        });

    };

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);  
    };

    request.onsuccess = (event) => {

        const db = event.target.result;

        
        insertUser(db, {
            email: 'admin@admin.com',
            password: 'password',
            name: 'Admin',
            role: 'Admin'
        });

        insertUser(db, {
            email: 'user1@gmail.com',
            password: 'password',
            name: 'User 1',
            role: 'User'
        });

        //getUserByEmail(db, "admin@admin.com");

        db.close();
    }

    function insertUser(db, user){

        const txn = db.transaction('Users', 'readwrite');

        const store = txn.objectStore('Users');

        let query = store.put(user);

        query.onsuccess = function (event) {
            console.log(event);
        };

        query.onerror = function (event) {
            console.log(event.target.errorCode);
        };

    }

    function getUserByEmail(db, email){

        const txn = db.transaction('Users','readonly');
        const store = txn.objectStore('Users');

        const index = store.index('email');

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