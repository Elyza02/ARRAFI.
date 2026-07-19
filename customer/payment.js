/*=========================================
            PAYMENT.JS
=========================================*/

/*=========================
        ELEMENT
=========================*/

const invoice = document.getElementById("invoice");

const subtotal = document.getElementById("subtotal");

const shipping = document.getElementById("shipping");

const discount = document.getElementById("discount");

const grandTotal = document.getElementById("grandTotal");

const paymentProof =
document.getElementById("paymentProof");

const previewImage =
document.getElementById("previewImage");

const note =
document.getElementById("note");

const payButton =
document.getElementById("payButton");

/*=========================
        DATA
=========================*/

const checkout =
JSON.parse(

localStorage.getItem("checkout")

);

const currentUser =
JSON.parse(

localStorage.getItem("currentUser")

);

/*=========================
        VALIDASI
=========================*/

if(!checkout){

    alert("Data pembayaran tidak ditemukan.");

    window.location.href="cart.html";

}

/*=========================
        FORMAT
=========================*/

function rupiah(number){

    return "Rp " +

    Number(number)

    .toLocaleString("id-ID");

}

/*=========================
        LOAD DATA
=========================*/

invoice.innerHTML=

checkout.invoice;

subtotal.innerHTML=

rupiah(checkout.subtotal);

shipping.innerHTML=

rupiah(checkout.ongkir);

discount.innerHTML=

"- "+rupiah(checkout.diskon);

grandTotal.innerHTML=

rupiah(checkout.total);

/*=========================
        PREVIEW IMAGE
=========================*/

let proofImage="";

paymentProof.onchange=function(e){

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(event){

        proofImage=

        event.target.result;

        previewImage.src=

        proofImage;

        previewImage.style.display="block";

    }

    reader.readAsDataURL(file);

}

/*=========================
        BAYAR
=========================*/

payButton.onclick=function(){

    const metode=document.querySelector(

        "input[name='payment']:checked"

    ).value;

    if(

        metode!="COD" &&

        proofImage===""

    ){

        alert(

        "Silakan upload bukti pembayaran."

        );

        return;

    }

    let orders=

    JSON.parse(

    localStorage.getItem("orders")

    ) || [];

    const order={

        invoice:

        checkout.invoice,

        nama:

        currentUser.nama,

        email:

        currentUser.email,

        tanggal:

        new Date()

        .toISOString()

        .split("T")[0],

        produk:

        checkout.produk,

        subtotal:

        checkout.subtotal,

        ongkir:

        checkout.ongkir,

        diskon:

        checkout.diskon,

        total:

        checkout.total,

        metode:

        metode,

        bukti:

        proofImage,

        catatan:

        note.value.trim(),

        status:

        "Menunggu Verifikasi"

    };

    orders.push(order);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    localStorage.setItem(

        "lastOrder",

        JSON.stringify(order)

    );

    localStorage.removeItem("cart");

    localStorage.removeItem("checkout");

    alert(

        "Pembayaran berhasil."

    );

    window.location.href=

    "status.html";

}