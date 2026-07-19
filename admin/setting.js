/*=====================================
        SETTINGS.JS V3
            BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const backBtn =
document.getElementById("backBtn");

const adminName =
document.getElementById("adminName");

const adminEmail =
document.getElementById("adminEmail");

const nameInput =
document.getElementById("nameInput");

const emailInput =
document.getElementById("emailInput");

const passwordInput =
document.getElementById("passwordInput");

const confirmPassword =
document.getElementById("confirmPassword");

const darkMode =
document.getElementById("darkMode");

/*========== DATA ADMIN ==========*/

let admin = {

    nama : "Admin Catering",

    email : "admin@cateringarrafi.com",

    password : "admin123"

};

/*========== LOAD ADMIN ==========*/

function loadAdmin(){

    const data = localStorage.getItem("admin");

    if(data){

        admin = JSON.parse(data);

    }

    adminName.textContent =
    admin.nama;

    adminEmail.textContent =
    admin.email;

    nameInput.value =
    admin.nama;

    emailInput.value =
    admin.email;

}

/*========== LOAD DARK MODE ==========*/

function loadDarkMode(){

    const mode =

    localStorage.getItem("darkMode");

    if(mode==="true"){

        darkMode.checked = true;

        document.body.classList.add("dark");

    }

}

/*========== DARK MODE ==========*/

darkMode.addEventListener(

"change",

function(){

    if(this.checked){

        document.body.classList.add("dark");

        localStorage.setItem(

            "darkMode",

            true

        );

    }else{

        document.body.classList.remove("dark");

        localStorage.setItem(

            "darkMode",

            false

        );

    }

});



/*========== BACK ==========*/

backBtn.onclick=function(){

    location.href="dashboard.html";

}

/*========== LOAD ==========*/

loadAdmin();

loadDarkMode();
/*=====================================
        SETTINGS.JS V3
            BAGIAN 2
=====================================*/

const saveBtn =
document.getElementById("saveBtn");

const resetBtn =
document.getElementById("resetBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const resetModal =
document.getElementById("resetModal");

const cancelReset =
document.getElementById("cancelReset");

const confirmReset =
document.getElementById("confirmReset");

/*========== SIMPAN ==========*/

saveBtn.onclick = function(){

    const nama =
    nameInput.value.trim();

    const email =
    emailInput.value.trim();

    const pass =
    passwordInput.value.trim();

    const confirm =
    confirmPassword.value.trim();

    if(nama===""){

        alert("Nama admin tidak boleh kosong.");

        return;

    }

    if(email===""){

        alert("Email tidak boleh kosong.");

        return;

    }

    if(pass!=="" && pass!==confirm){

        alert("Konfirmasi password tidak sesuai.");

        return;

    }

    admin.nama = nama;

    admin.email = email;

    if(pass!==""){

        admin.password = pass;

    }

    localStorage.setItem(

        "admin",

        JSON.stringify(admin)

    );

    adminName.textContent =
    admin.nama;

    adminEmail.textContent =
    admin.email;

    passwordInput.value = "";

    confirmPassword.value = "";

    alert(

        "Perubahan berhasil disimpan."

    );

};

/*========== RESET DATA ==========*/

resetBtn.onclick = function(){

    resetModal.style.display = "flex";

};

cancelReset.onclick = function(){

    resetModal.style.display = "none";

};

confirmReset.onclick = function(){

    localStorage.removeItem("orders");

    resetModal.style.display = "none";

    alert(

        "Seluruh data pesanan berhasil dihapus."

    );

};

/*========== LOGOUT ==========*/

logoutBtn.onclick = function(){

    localStorage.removeItem("currentUser");

    localStorage.removeItem("currentAdmin");

    alert(

        "Logout berhasil."

    );

    location.href="../index.html";

};

/*========== CLOSE MODAL ==========*/

window.addEventListener("click",function(e){

    if(e.target===resetModal){

        resetModal.style.display="none";

    }

});

/*========== STORAGE ==========*/

window.addEventListener("storage",function(){

    loadAdmin();

    loadDarkMode();

});