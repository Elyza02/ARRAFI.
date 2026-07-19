/*=========================================
            HISTORY.JS
            BAGIAN 1
=========================================*/

/*=========================
        ELEMENT
=========================*/

const historyList =
document.getElementById("historyList");

const searchInput =
document.getElementById("searchInput");

const refreshBtn =
document.getElementById("refreshBtn");

const filterButtons =
document.querySelectorAll(".filter-btn");

/*=========================
        DATA
=========================*/

const currentUser =
JSON.parse(

localStorage.getItem("currentUser")

);

let orders =
JSON.parse(

localStorage.getItem("orders")

) || [];

let currentFilter="Semua";

/*=========================
        FORMAT RUPIAH
=========================*/

function rupiah(number){

    return "Rp " +

    Number(number)

    .toLocaleString("id-ID");

}

/*=========================
        FILTER USER
=========================*/

function getUserOrders(){

    if(!currentUser){

        return [];

    }

    return orders.filter(order=>{

        return order.email===

        currentUser.email;

    });

}

/*=========================
        RENDER
=========================*/

function renderHistory(data){

    historyList.innerHTML="";

    if(data.length===0){

        historyList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-clock-rotate-left"></i>

            <h3>

                Belum Ada Riwayat

            </h3>

            <p>

                Pesanan Anda akan muncul di sini.

            </p>

        </div>

        `;

        return;

    }

    data.sort((a,b)=>{

        return new Date(b.tanggal)-new Date(a.tanggal);

    });

    data.forEach((order,index)=>{

        let jumlahProduk=0;

        order.produk.forEach(item=>{

            jumlahProduk += item.qty;

        });

        historyList.innerHTML += `

        <div class="history-card">

            <div class="history-top">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="status">

                    ${order.status}

                </span>

            </div>

            <div class="history-body">

                <p>

                    <i class="fa-solid fa-box"></i>

                    ${jumlahProduk} Menu

                </p>

                <h2>

                    ${rupiah(order.total)}

                </h2>

            </div>

            <button

            class="detail-btn"

            onclick="showHistory(${index})">

                Lihat Ringkasan

            </button>

        </div>

        `;

    });

}

/*=========================
        SEARCH
=========================*/

searchInput.addEventListener(

"keyup",

function(){

    const keyword=

    this.value

    .toLowerCase();

    const hasil=

    getUserOrders().filter(order=>{

        const cocokInvoice=

        order.invoice

        .toLowerCase()

        .includes(keyword);

        const cocokStatus=

        currentFilter==="Semua" ||

        order.status===currentFilter;

        return

        cocokInvoice &&

        cocokStatus;

    });

    renderHistory(hasil);

}

);

/*=========================
        FILTER
=========================*/

filterButtons.forEach(btn=>{

    btn.addEventListener(

    "click",

    function(){

        filterButtons.forEach(item=>{

            item.classList.remove("active");

        });

        this.classList.add("active");

        currentFilter=

        this.dataset.status;

        if(currentFilter==="Semua"){

            renderHistory(

                getUserOrders()

            );

            return;

        }

        const hasil=

        getUserOrders()

        .filter(order=>{

            return order.status===

            currentFilter;

        });

        renderHistory(hasil);

    });

});

/*=========================
        REFRESH
=========================*/

refreshBtn.onclick=function(){

    orders=

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    renderHistory(

        getUserOrders()

    );

}

/*=========================
        LOAD
=========================*/

renderHistory(

    getUserOrders()

);
/*=========================================
            HISTORY.JS
            BAGIAN 2
=========================================*/

/*=========================
        MODAL
=========================*/

const detailModal =
document.getElementById("detailModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const detailBtn =
document.getElementById("detailBtn");

let selectedOrder=null;

/*=========================
        RINGKASAN
=========================*/

function showHistory(index){

    const userOrders=getUserOrders();

    selectedOrder=userOrders[index];

    let produkHTML="";

    selectedOrder.produk.forEach(item=>{

        produkHTML+=`

        <div class="history-product">

            <img
            src="${item.gambar}"
            class="history-image">

            <div class="history-info">

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

        </div>

        `;

    });

    modalBody.innerHTML=`

    <div class="detail-group">

        <label>Invoice</label>

        <p>${selectedOrder.invoice}</p>

    </div>

    <div class="detail-group">

        <label>Tanggal</label>

        <p>${selectedOrder.tanggal}</p>

    </div>

    <div class="detail-group">

        <label>Status</label>

        <p>${selectedOrder.status}</p>

    </div>

    <div class="detail-group">

        <label>Metode</label>

        <p>${selectedOrder.metode}</p>

    </div>

    <div class="detail-group">

        <label>Daftar Menu</label>

        ${produkHTML}

    </div>

    <div class="detail-group">

        <label>Total Pembayaran</label>

        <h3>

            ${rupiah(selectedOrder.total)}

        </h3>

    </div>

    `;

    detailModal.style.display="flex";

}

/*=========================
        TUTUP MODAL
=========================*/

closeModal.onclick=function(){

    detailModal.style.display="none";

}

window.onclick=function(e){

    if(e.target===detailModal){

        detailModal.style.display="none";

    }

}

/*=========================
        DETAIL
=========================*/

detailBtn.onclick=function(){

    if(!selectedOrder) return;

    localStorage.setItem(

        "lastOrder",

        JSON.stringify(selectedOrder)

    );

    window.location.href=

    "order-detail.html";

}

/*=========================
        AUTO UPDATE
=========================*/

window.addEventListener(

"storage",

function(){

    orders=

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    renderHistory(

        getUserOrders()

    );

});

setInterval(function(){

    orders=

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    renderHistory(

        getUserOrders()

    );

},3000);