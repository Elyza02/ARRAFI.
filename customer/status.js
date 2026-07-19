 /*=========================================
            STATUS.JS
=========================================*/

/*=========================
        ELEMENT
=========================*/

const invoice =
document.getElementById("invoice");

const total =
document.getElementById("total");

const paymentMethod =
document.getElementById("paymentMethod");

const statusText =
document.getElementById("statusText");

const refreshBtn =
document.getElementById("refreshBtn");

const detailBtn =
document.getElementById("detailBtn");

const step1 =
document.getElementById("step1");

const step2 =
document.getElementById("step2");

const step3 =
document.getElementById("step3");

const step4 =
document.getElementById("step4");

const step5 =
document.getElementById("step5");

/*=========================
        FORMAT RUPIAH
=========================*/

function rupiah(number){

    return "Rp " +

    Number(number)

    .toLocaleString("id-ID");

}

/*=========================
        LOAD ORDER
=========================*/

function loadStatus(){

    const lastOrder =
    JSON.parse(

        localStorage.getItem("lastOrder")

    );

    if(!lastOrder){

        alert("Pesanan tidak ditemukan.");

        window.location.href="home.html";

        return;

    }

    const orders =
    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    const order =
    orders.find(item=>

        item.invoice===

        lastOrder.invoice

    );

    if(!order) return;

    invoice.innerHTML =
    order.invoice;

    total.innerHTML =
    rupiah(order.total);

    paymentMethod.innerHTML =
    order.metode;

    statusText.innerHTML =
    order.status;

    updateTimeline(order.status);

}

/*=========================
        TIMELINE
=========================*/

function resetStep(){

    document

    .querySelectorAll(".step")

    .forEach(item=>{

        item.classList.remove(

            "active"

        );

    });

}

function updateTimeline(status){

    resetStep();

    switch(status){

        case "Menunggu Verifikasi":

            step1.classList.add("active");

        break;

        case "Diproses":

            step1.classList.add("active");

            step2.classList.add("active");

        break;

        case "Produksi":

            step1.classList.add("active");

            step2.classList.add("active");

            step3.classList.add("active");

        break;

        case "Pengiriman":

            step1.classList.add("active");

            step2.classList.add("active");

            step3.classList.add("active");

            step4.classList.add("active");

        break;

        case "Selesai":

            step1.classList.add("active");

            step2.classList.add("active");

            step3.classList.add("active");

            step4.classList.add("active");

            step5.classList.add("active");

        break;

    }

}

/*=========================
        DETAIL
=========================*/

detailBtn.onclick=function(){

    window.location.href=

    "order-detail.html";

}

/*=========================
        REFRESH
=========================*/

refreshBtn.onclick=function(){

    loadStatus();

}

/*=========================
        AUTO UPDATE
=========================*/

setInterval(function(){

    loadStatus();

},3000);

/*=========================
        STORAGE UPDATE
=========================*/

window.addEventListener(

    "storage",

    function(){

        loadStatus();

    }

);

/*=========================
        LOAD
=========================*/

loadStatus();