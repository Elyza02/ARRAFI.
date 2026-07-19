 /*=========================================
            PROFILE.JS
            BAGIAN 1
=========================================*/

/*=========================
        ELEMENT
=========================*/

const profileImage =
document.getElementById("profileImage");

const userName =
document.getElementById("userName");

const userEmail =
document.getElementById("userEmail");

const nama =
document.getElementById("nama");

const email =
document.getElementById("email");

const phone =
document.getElementById("phone");

const address =
document.getElementById("address");

const notification =
document.getElementById("notification");

const darkMode =
document.getElementById("darkMode");

const historyBtn =
document.getElementById("historyBtn");

const passwordBtn =
document.getElementById("passwordBtn");

const aboutBtn =
document.getElementById("aboutBtn");

const helpBtn =
document.getElementById("helpBtn");

/*=========================
        DATA USER
=========================*/

const currentUser =
JSON.parse(

localStorage.getItem("currentUser")

);

if(!currentUser){

    alert("Silakan login terlebih dahulu.");

    window.location.href="../index.html";

}

/*=========================
        LOAD USER
=========================*/

function loadProfile(){

    userName.innerHTML =
    currentUser.nama || "-";

    userEmail.innerHTML =
    currentUser.email || "-";

    nama.innerHTML =
    currentUser.nama || "-";

    email.innerHTML =
    currentUser.email || "-";

    phone.innerHTML =
    currentUser.phone || "-";

    address.innerHTML =
    currentUser.address || "-";

    if(currentUser.photo){

        profileImage.src =
        currentUser.photo;

    }

}

loadProfile();

/*=========================
        LOAD SETTING
=========================*/

notification.checked =

JSON.parse(

localStorage.getItem("notification")

) || false;

darkMode.checked =

JSON.parse(

localStorage.getItem("darkMode")

) || false;

/*=========================
        NOTIFICATION
=========================*/

notification.onchange=function(){

    localStorage.setItem(

        "notification",

        notification.checked

    );

}

/*=========================
        DARK MODE
=========================*/

function applyDarkMode(){

    if(darkMode.checked){

        document.body.classList.add(

            "dark"

        );

    }

    else{

        document.body.classList.remove(

            "dark"

        );

    }

}

applyDarkMode();

darkMode.onchange=function(){

    localStorage.setItem(

        "darkMode",

        darkMode.checked

    );

    applyDarkMode();

}

/*=========================
        MENU
=========================*/

historyBtn.onclick=function(){

    window.location.href=

    "history.html";

}

passwordBtn.onclick=function(){

    alert(

    "Fitur ubah password akan tersedia."

    );

}

aboutBtn.onclick=function(){

    alert(

`Catering Arrafi

Versi 1.0

Aplikasi pemesanan catering berbasis web.`

    );

}

helpBtn.onclick=function(){

    alert(

`Hubungi Admin

Email :
support@cateringarrafi.com

WhatsApp :
0812-3456-7890`

    );

}
/*=========================================
            PROFILE.JS
            BAGIAN 2
=========================================*/

/*=========================
        ELEMENT
=========================*/

const editProfile =
document.getElementById("editProfile");

const logoutBtn =
document.getElementById("logoutBtn");

const logoutModal =
document.getElementById("logoutModal");

const cancelLogout =
document.getElementById("cancelLogout");

const confirmLogout =
document.getElementById("confirmLogout");

/*=========================
        EDIT PROFILE
=========================*/

editProfile.onclick=function(){

    const newName=prompt(

        "Masukkan nama baru",

        currentUser.nama || ""

    );

    if(newName===null) return;

    const newPhone=prompt(

        "Masukkan nomor HP",

        currentUser.phone || ""

    );

    if(newPhone===null) return;

    const newAddress=prompt(

        "Masukkan alamat",

        currentUser.address || ""

    );

    if(newAddress===null) return;

    const newPhoto=prompt(

        "Masukkan URL foto (opsional)",

        currentUser.photo || ""

    );

    currentUser.nama=
    newName.trim();

    currentUser.phone=
    newPhone.trim();

    currentUser.address=
    newAddress.trim();

    currentUser.photo=
    newPhoto.trim();

    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );

    loadProfile();

    alert(

        "Profil berhasil diperbarui."

    );

}

/*=========================
        LOGOUT
=========================*/

logoutBtn.onclick=function(){

    logoutModal.style.display="flex";

}

cancelLogout.onclick=function(){

    logoutModal.style.display="none";

}

confirmLogout.onclick=function(){

    localStorage.removeItem(

        "currentUser"

    );

    logoutModal.style.display="none";

    window.location.href="../index.html";

}

/*=========================
        CLOSE MODAL
=========================*/

window.onclick=function(e){

    if(e.target===logoutModal){

        logoutModal.style.display="none";

    }

}

/*=========================
        STORAGE UPDATE
=========================*/

window.addEventListener(

    "storage",

    function(){

        const user=

        JSON.parse(

            localStorage.getItem("currentUser")

        );

        if(user){

            currentUser.nama=user.nama;

            currentUser.email=user.email;

            currentUser.phone=user.phone;

            currentUser.address=user.address;

            currentUser.photo=user.photo;

            loadProfile();

        }

    }

);