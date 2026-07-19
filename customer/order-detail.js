 /*=========================================
        ORDER DETAIL.JS
=========================================*/

/*=========================
        ELEMENT
=========================*/

const invoice =
document.getElementById("invoice");

const tanggal =
document.getElementById("tanggal");

const status =
document.getElementById("status");

const nama =
document.getElementById("nama");

const email =
document.getElementById("email");

const productList =
document.getElementById("productList");

const metode =
document.getElementById("metode");

const subtotal =
document.getElementById("subtotal");

const ongkir =
document.getElementById("ongkir");

const diskon =
document.getElementById("diskon");

const total =
document.getElementById("total");

const proofImage =
document.getElementById("proofImage");

const catatan =
document.getElementById("catatan");

const backHome =
document.getElementById("backHome");

/*=========================
        FORMAT RUPIAH
=========================*/

function rupiah(number){

    return "Rp " +

    Number(number)

    .toLocaleString("id-ID");

}

/*=========================
        LOAD DATA
=========================*/

function loadOrder(){

    const lastOrder=
    JSON.parse(

        localStorage.getItem("lastOrder")

    );

    if(!lastOrder){

        alert("Data pesanan tidak ditemukan.");

        window.location.href="home.html";

        return;

    }

    const orders=
    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    const order=
    orders.find(item=>

        item.invoice===lastOrder.invoice

    );

    if(!order) return;

    invoice.innerHTML=
    order.invoice;

    tanggal.innerHTML=
    order.tanggal;

    status.innerHTML=
    order.status;

    nama.innerHTML=
    order.nama;

    email.innerHTML=
    order.email;

    metode.innerHTML=
    order.metode;

    subtotal.innerHTML=
    rupiah(order.subtotal);

    ongkir.innerHTML=
    rupiah(order.ongkir);

    diskon.innerHTML=
    "- "+rupiah(order.diskon);

    total.innerHTML=
    rupiah(order.total);

    catatan.innerHTML=

    order.catatan || "-";

    if(order.bukti){

        proofImage.src=
        order.bukti;

        proofImage.style.display="block";

    }else{

        proofImage.style.display="none";

    }

    renderProduct(order.produk);

    updateBadge(order.status);

}

/*=========================
        PRODUK
=========================*/

function renderProduct(produk){

    productList.innerHTML="";

    produk.forEach(item=>{

        productList.innerHTML+=`

        <div class="product-card">

            <img

            src="${item.gambar}"

            class="product-image">

            <div class="product-info">

                <h4>

                    ${item.nama}

                </h4>

                <small>

                    ${rupiah(item.harga)}

                </small>

                <p>

                    Qty : ${item.qty}

                </p>

            </div>

            <h4>

                ${rupiah(

                    item.harga *

                    item.qty

                )}

            </h4>

        </div>

        `;

    });

}

/*=========================
        STATUS BADGE
=========================*/

function updateBadge(text){

    status.className="status";

    switch(text){

        case "Menunggu Verifikasi":

            status.style.background="#FFC107";

            status.style.color="#fff";

        break;

        case "Diproses":

            status.style.background="#2196F3";

            status.style.color="#fff";

        break;

        case "Produksi":

            status.style.background="#9C27B0";

            status.style.color="#fff";

        break;

        case "Pengiriman":

            status.style.background="#FF9800";

            status.style.color="#fff";

        break;

        case "Selesai":

            status.style.background="#4CAF50";

            status.style.color="#fff";

        break;

    }

}

/*=========================
        HOME
=========================*/

backHome.onclick=function(){

    window.location.href="home.html";

}

/*=========================
        AUTO UPDATE
=========================*/

setInterval(function(){

    loadOrder();

},3000);

window.addEventListener(

    "storage",

    function(){

        loadOrder();

    }

);

/*=========================
        LOAD
=========================*/

loadOrder();