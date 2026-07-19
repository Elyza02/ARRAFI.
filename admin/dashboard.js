/*=========================================
            DASHBOARD.JS
            BAGIAN 1
=========================================*/

/*=========================
        ELEMENT
=========================*/

const totalOrder =
document.getElementById("totalOrder");

const processingOrder =
document.getElementById("processingOrder");

const deliveryOrder =
document.getElementById("deliveryOrder");

const finishOrder =
document.getElementById("finishOrder");

const ordersBtn =
document.getElementById("ordersBtn");

const verificationBtn =
document.getElementById("verificationBtn");

const kitchenBtn =
document.getElementById("kitchenBtn");

const productionBtn =
document.getElementById("productionBtn");

const deliveryBtn =
document.getElementById("deliveryBtn");

const reportBtn =
document.getElementById("reportBtn");

const settingBtn =
document.getElementById("settingBtn");

const refreshBtn =
document.querySelector(".notif-btn");

/*=========================
        DATA
=========================*/

let orders =
JSON.parse(

localStorage.getItem("orders")

) || [];

/*=========================
        LOAD STATISTIC
=========================*/

function loadStatistic(){

    orders =
    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    totalOrder.innerHTML =

    orders.filter(item=>

        item.status==="Menunggu Verifikasi"

    ).length;

    processingOrder.innerHTML =

    orders.filter(item=>

        item.status==="Diproses" ||

        item.status==="Produksi"

    ).length;

    deliveryOrder.innerHTML =

    orders.filter(item=>

        item.status==="Pengiriman"

    ).length;

    finishOrder.innerHTML =

    orders.filter(item=>

        item.status==="Selesai"

    ).length;

}

/*=========================
        REFRESH
=========================*/

refreshBtn.onclick=function(){

    loadStatistic();

}

/*=========================
        MENU
=========================*/

ordersBtn.onclick=function(){

    window.location.href=

    "orders.html";

}

verificationBtn.onclick=function(){

    window.location.href=

    "verification.html";

}

kitchenBtn.onclick=function(){

    window.location.href=

    "kitchen.html";

}

productionBtn.onclick=function(){

    window.location.href=

    "production.html";

}

deliveryBtn.onclick=function(){

    window.location.href=

    "delivery.html";

}

reportBtn.onclick=function(){

    window.location.href=

    "report.html";

}

settingBtn.onclick=function(){

    window.location.href=

    "setting.html";

}

/*=========================
        LOAD
=========================*/

loadStatistic();
/*=========================================
            DASHBOARD.JS
            BAGIAN 2
=========================================*/

/*=========================
        ELEMENT
=========================*/

const logoutBtn =
document.getElementById("logoutBtn");

const logoutModal =
document.getElementById("logoutModal");

const cancelLogout =
document.getElementById("cancelLogout");

const confirmLogout =
document.getElementById("confirmLogout");

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
        AUTO UPDATE
=========================*/

function autoRefresh(){

    loadStatistic();

}

setInterval(autoRefresh,3000);

/*=========================
        STORAGE UPDATE
=========================*/

window.addEventListener(

    "storage",

    function(){

        loadStatistic();

    }

);

 /*=========================
        VALIDASI ROLE
=========================*/

if(

    currentUser.role &&

    currentUser.role !== "admin"

){

    alert(

        "Anda tidak memiliki akses ke halaman Admin."

    );

    window.location.href="../customer/home.html";

}

/*=========================
        MENU MOBILE
=========================*/

const menuButton =
document.querySelector(".menu-btn");

menuButton.onclick=function(){

    alert(

`Dashboard Admin

• Daftar Pesanan
• Verifikasi Pembayaran
• Proses Makanan
• Produksi
• Pengiriman
• Laporan
• Pengaturan`

    );

}

/*=========================
        LOAD
=========================*/

loadStatistic();