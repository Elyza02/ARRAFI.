/*=========================================
            CART.JS
            BAGIAN 1
=========================================*/

/*=========================
        ELEMENT
=========================*/

const cartContainer =
document.getElementById("cartContainer");

const subtotalText =
document.getElementById("subtotal");

const shippingText =
document.getElementById("shipping");

const discountText =
document.getElementById("discount");

const grandTotalText =
document.getElementById("grandTotal");

const checkoutBtn =
document.getElementById("checkoutBtn");

/*=========================
        DATA
=========================*/

let cart =
JSON.parse(

localStorage.getItem("cart")

) || [];

let subtotal=0;

let shipping=10000;

let discount=0;

let grandTotal=0;

/*=========================
        FORMAT RUPIAH
=========================*/

function rupiah(number){

    return "Rp " +

    Number(number)

    .toLocaleString("id-ID");

}

/*=========================
        TOTAL
=========================*/

function calculateTotal(){

    subtotal=0;

    cart.forEach(item=>{

        subtotal +=

        item.harga * item.qty;

    });

    if(subtotal>=100000){

        discount=10000;

    }

    else{

        discount=0;

    }

    if(cart.length===0){

        shipping=0;

    }

    else{

        shipping=10000;

    }

    grandTotal=

    subtotal+

    shipping-

    discount;

    subtotalText.innerHTML=

    rupiah(subtotal);

    shippingText.innerHTML=

    rupiah(shipping);

    discountText.innerHTML=

    "- "+rupiah(discount);

    grandTotalText.innerHTML=

    rupiah(grandTotal);

}

/*=========================
        RENDER
=========================*/

function renderCart(){

    cartContainer.innerHTML="";

    if(cart.length===0){

        cartContainer.innerHTML=`

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <h3>

                Keranjang Kosong

            </h3>

            <p>

                Silakan pilih menu terlebih dahulu.

            </p>

        </div>

        `;

        calculateTotal();

        return;

    }

    cart.forEach((item,index)=>{

        cartContainer.innerHTML+=`

        <div class="cart-card">

            <img

            src="${item.gambar}"

            class="cart-image">

            <div class="cart-info">

                <h3>

                    ${item.nama}

                </h3>

                <p>

                    ${item.kategori}

                </p>

                <h4>

                    ${rupiah(item.harga)}

                </h4>

                <small>

                    ${item.catatan || "-"}

                </small>

                <div class="qty-box">

                    <button

                    onclick="minusQty(${index})">

                    -

                    </button>

                    <span>

                    ${item.qty}

                    </span>

                    <button

                    onclick="plusQty(${index})">

                    +

                    </button>

                </div>

            </div>

            <button

            class="delete-item"

            onclick="deleteItem(${index})">

            <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    calculateTotal();

}

/*=========================
        LOAD
=========================*/

renderCart();
/*=========================================
            CART.JS
            BAGIAN 2
=========================================*/

/*=========================
        TAMBAH QTY
=========================*/

function plusQty(index){

    cart[index].qty++;

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    renderCart();

}

/*=========================
        KURANG QTY
=========================*/

function minusQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    renderCart();

}

/*=========================
        HAPUS ITEM
=========================*/

function deleteItem(index){

    if(confirm("Hapus produk ini dari keranjang?")){

        cart.splice(index,1);

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

        renderCart();

    }

}

/*=========================
        HAPUS SEMUA
=========================*/

const clearCart =
document.getElementById("clearCart");

const deleteModal =
document.getElementById("deleteModal");

const cancelDelete =
document.getElementById("cancelDelete");

const confirmDelete =
document.getElementById("confirmDelete");

clearCart.onclick=function(){

    if(cart.length===0){

        alert("Keranjang masih kosong.");

        return;

    }

    deleteModal.style.display="flex";

}

cancelDelete.onclick=function(){

    deleteModal.style.display="none";

}

confirmDelete.onclick=function(){

    cart=[];

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    deleteModal.style.display="none";

    renderCart();

}

/*=========================
        TUTUP MODAL
=========================*/

window.onclick=function(e){

    if(e.target==deleteModal){

        deleteModal.style.display="none";

    }

}

/*=========================
        CHECKOUT
=========================*/

checkoutBtn.onclick=function(){

    if(cart.length===0){

        alert("Keranjang masih kosong.");

        return;

    }

    const order={

        invoice:
        "INV-"+Date.now(),

        tanggal:
        new Date().toISOString().split("T")[0],

        produk:cart,

        subtotal:subtotal,

        ongkir:shipping,

        diskon:discount,

        total:grandTotal,

        status:"Menunggu Pembayaran"

    };

    localStorage.setItem(

        "checkout",

        JSON.stringify(order)

    );

    window.location.href="payment.html";

}

/*=========================
        UPDATE CART
=========================*/

window.addEventListener(

    "storage",

    function(){

        cart = JSON.parse(

            localStorage.getItem("cart")

        ) || [];

        renderCart();

    }

);