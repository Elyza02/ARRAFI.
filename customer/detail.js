/*=========================================
            DETAIL.JS
=========================================*/

/*=========================
        ELEMENT
=========================*/

const menuImage = document.getElementById("menuImage");
const menuCategory = document.getElementById("menuCategory");
const menuName = document.getElementById("menuName");
const menuPrice = document.getElementById("menuPrice");
const menuDescription = document.getElementById("menuDescription");

const qty = document.getElementById("qty");
const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

const note = document.getElementById("note");

const totalPrice = document.getElementById("totalPrice");

const addCartBtn = document.getElementById("addCartBtn");

const cartBadge = document.getElementById("cartBadge");

/*=========================
        DATA MENU
=========================*/

const menus =
JSON.parse(localStorage.getItem("menus")) || [];

const selectedId =
Number(localStorage.getItem("selectedMenu"));

const menu =
menus.find(item => item.id === selectedId);

if(!menu){

    alert("Menu tidak ditemukan.");

    window.location.href="home.html";

}

/*=========================
        LOAD MENU
=========================*/

menuImage.src = menu.gambar;

menuCategory.innerHTML = menu.kategori;

menuName.innerHTML = menu.nama;

menuPrice.innerHTML =
"Rp " +
menu.harga.toLocaleString("id-ID");

menuDescription.innerHTML =
menu.deskripsi;

/*=========================
        QTY
=========================*/

let jumlah = 1;

function updateTotal(){

    qty.innerHTML = jumlah;

    totalPrice.innerHTML =
    "Rp " +
    (menu.harga * jumlah)
    .toLocaleString("id-ID");

}

minusBtn.onclick = function(){

    if(jumlah > 1){

        jumlah--;

        updateTotal();

    }

}

plusBtn.onclick = function(){

    jumlah++;

    updateTotal();

}

/*=========================
        BADGE
=========================*/

function updateBadge(){

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{

        total += item.qty;

    });

    if(total===0){

        cartBadge.style.display="none";

    }

    else{

        cartBadge.style.display="flex";

        cartBadge.innerHTML=total;

    }

}

updateBadge();

/*=========================
        ADD CART
=========================*/

addCartBtn.onclick=function(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const index =
    cart.findIndex(item=>item.id===menu.id);

    if(index!=-1){

        cart[index].qty += jumlah;

        if(note.value.trim()!=""){

            cart[index].catatan =
            note.value.trim();

        }

    }

    else{

        cart.push({

            id:menu.id,

            nama:menu.nama,

            kategori:menu.kategori,

            harga:menu.harga,

            gambar:menu.gambar,

            qty:jumlah,

            catatan:note.value.trim()

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateBadge();

    alert("Produk berhasil ditambahkan ke keranjang.");

    window.location.href="cart.html";

}

/*=========================
        LOAD
=========================*/

updateTotal();