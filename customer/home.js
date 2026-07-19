/*=========================================
            HOME.JS
=========================================*/

/*=========================
        ELEMENT
=========================*/
localStorage.removeItem("menus");

const userName = document.getElementById("userName");
const userPhoto = document.getElementById("userPhoto");

const menuGrid = document.getElementById("menuGrid");

const searchInput = document.getElementById("searchInput");

const cartBadge = document.getElementById("cartBadge");

const categoryButtons =
document.querySelectorAll(".category-btn");

const orderNow =
document.getElementById("orderNow");

/*=========================
        USER LOGIN
=========================*/

const currentUser =
JSON.parse(

localStorage.getItem("currentUser")

);

if(!currentUser){

    window.location.href="../index.html";

}

userName.innerHTML=currentUser.nama;

if(currentUser.foto){

    userPhoto.src=currentUser.foto;
 
}

/*=========================
        MENU DEFAULT
=========================*/

let menus=
JSON.parse(

localStorage.getItem("menus")

);

if(!menus){

menus=[

{
id:1,
nama:"Lunch Box A",
kategori:"Lunch",
harga:25000,
gambar:"../customer/menuu1.png",
deskripsi:"Nasi, Ayam Bakar, Sayur, Sambal"
},

{
id:2,
nama:"Lunch Box B",
kategori:"Lunch",
harga:25000,
gambar:"../customer/menuu2.png",
deskripsi:"Nasi, Rendang, Sayur"
},

{
id:3,
nama:"Breakfast A",
kategori:"Breakfast",
harga:20000,
gambar:"../customer/menu3.png",
deskripsi:"Nasi Kuning"
},

{
id:4,
nama:" Breakfast B",
kategori:"Breakfast",
harga:20000,
gambar:"../customer/menu4.png",
deskripsi:"Nasi Goreng"
},

{
id:5,
nama:"Snack A",
kategori:"Snack",
harga:15000,
gambar:"../customer/menu5.png",
deskripsi:"Risoles Mayo, pastel, agar-agar, air mineral"
},

{
id:6,
nama:"Snack B",
kategori:"Snack",
harga:15000,
gambar:"../customer/menu6.png",
deskripsi:"lapis, klepon, dadar gulung, air mineral"
}

];

localStorage.setItem(

"menus",

JSON.stringify(menus)

);

}

/*=========================
        RENDER MENU
=========================*/

function renderMenu(data){

menuGrid.innerHTML="";

if(data.length===0){

menuGrid.innerHTML=`

<div class="empty">

<h3>

Menu tidak ditemukan

</h3>

</div>

`;

return;

}

data.forEach(menu=>{

menuGrid.innerHTML+=`

<div class="menu-card">

<img src="${menu.gambar}">

<div class="menu-info">

<h4>

${menu.nama}

</h4>

<p>

${menu.deskripsi}

</p>

<h3>

Rp ${menu.harga.toLocaleString("id-ID")}

</h3>

<button

onclick="lihatDetail(${menu.id})">

Lihat Detail

</button>

</div>

</div>

`;

});

}

/*=========================
        DETAIL
=========================*/

function lihatDetail(id){

localStorage.setItem(

"selectedMenu",

id

);

window.location.href="detail.html";

}

/*=========================
        SEARCH
=========================*/

searchInput.addEventListener(

"keyup",

function(){

const keyword=

this.value.toLowerCase();

const hasil=

menus.filter(item=>

item.nama

.toLowerCase()

.includes(keyword)

);

renderMenu(hasil);

}

);

/*=========================
        CATEGORY
=========================*/

categoryButtons.forEach(btn=>{

btn.addEventListener(

"click",

function(){

categoryButtons.forEach(x=>{

x.classList.remove("active");

});

this.classList.add("active");

const kategori=

this.dataset.category;

if(kategori==="Semua"){

renderMenu(menus);

return;

}

const hasil=

menus.filter(item=>

item.kategori===kategori

);

renderMenu(hasil);

}

);

});

/*=========================
        BADGE CART
=========================*/

function updateCart(){

const cart=

JSON.parse(

localStorage.getItem("cart")

) || [];

let total=0;

cart.forEach(item=>{

total+=item.qty;

});

cartBadge.innerHTML=total;

if(total===0){

cartBadge.style.display="none";

}

else{

cartBadge.style.display="flex";

}

}

/*=========================
        BUTTON
=========================*/

orderNow.onclick=function(){

window.scrollTo({

top:420,

behavior:"smooth"

});

}

/*=========================
        LOAD
=========================*/

renderMenu(menus);

updateCart();