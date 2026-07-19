/*=========================================
        REGISTER.JS
=========================================*/

const registerForm = document.getElementById("registerForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword =
document.querySelector(".togglePassword");

/*=========================================
        SHOW PASSWORD
=========================================*/

togglePassword.addEventListener("click", function(){

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
        REGISTER
=========================================*/

registerForm.addEventListener("submit",function(e){

    e.preventDefault();

    const fullname=nama.value.trim();

    const userEmail=email.value.trim().toLowerCase();

    const userPassword=password.value.trim();

    const confirm=confirmPassword.value.trim();

    const role=document.querySelector(
        'input[name="role"]:checked'
    ).value;

    if(fullname===""){

        alert("Nama lengkap wajib diisi.");

        nama.focus();

        return;

    }

    if(userEmail===""){

        alert("Email wajib diisi.");

        email.focus();

        return;

    }

    if(userPassword.length<6){

        alert("Password minimal 6 karakter.");

        password.focus();

        return;

    }

    if(userPassword!==confirm){

        alert("Konfirmasi password tidak sama.");

        confirmPassword.focus();

        return;

    }

    let users=
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const sudahAda=
    users.find(user=>
        user.email===userEmail
    );

    if(sudahAda){

        alert("Email sudah terdaftar.");

        email.focus();

        return;

    }

    const newUser={

        id:Date.now(),

        nama:fullname,

        email:userEmail,

        password:userPassword,

        role:role,

        foto:"assets/default-user.png",

        createdAt:new Date().toISOString()

    };

    users.push(newUser);

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

    alert("Registrasi berhasil.");

    window.location.href="index.html";

});