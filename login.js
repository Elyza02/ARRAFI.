/*=========================================
            LOGIN.JS
=========================================*/

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const remember = document.getElementById("remember");

const togglePassword =
document.getElementById("togglePassword");

/*=========================================
        SHOW PASSWORD
=========================================*/

togglePassword.addEventListener("click",function(){

    if(password.type==="password"){

        password.type="text";

        this.innerHTML=
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        password.type="password";

        this.innerHTML=
        '<i class="fa-solid fa-eye"></i>';

    }

});

/*=========================================
        AUTO LOGIN
=========================================*/

window.onload=function(){

    const rememberUser=
    JSON.parse(

        localStorage.getItem("rememberUser")

    );

    if(rememberUser){

        email.value=
        rememberUser.email;

        password.value=
        rememberUser.password;

        remember.checked=true;

    }

}

/*=========================================
        LOGIN
=========================================*/

loginForm.addEventListener("submit",function(e){

    e.preventDefault();

    const userEmail=
    email.value.trim().toLowerCase();

    const userPassword=
    password.value.trim();

    if(userEmail===""){

        alert("Email wajib diisi.");

        email.focus();

        return;

    }

    if(userPassword===""){

        alert("Password wajib diisi.");

        password.focus();

        return;

    }

    const users=
    JSON.parse(

        localStorage.getItem("users")

    ) || [];

    const user=
    users.find(item=>

        item.email===userEmail &&

        item.password===userPassword

    );

    if(!user){

        alert("Email atau password salah.");

        return;

    }

    /*=========================
        SESSION LOGIN
    =========================*/

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    /*=========================
        REMEMBER ME
    =========================*/

    if(remember.checked){

        localStorage.setItem(

            "rememberUser",

            JSON.stringify({

                email:userEmail,

                password:userPassword

            })

        );

    }

    else{

        localStorage.removeItem(

            "rememberUser"

        );

    }

    /*=========================
        REDIRECT
    =========================*/

    if(user.role==="customer"){

        window.location.href=

        "customer/home.html";

    }

    else if(user.role==="admin"){

        window.location.href=

        "admin/dashboard.html";

    }

});