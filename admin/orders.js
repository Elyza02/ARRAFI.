 /*=====================================
    DAFTAR PESANAN V2
    BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const orderList = document.getElementById("orderList");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const backBtn = document.getElementById("backBtn");

const filterButtons =
document.querySelectorAll(".filter-btn");

/*========== DATA ==========*/

let orders = [];
let currentFilter = "Semua";

/*========== LOAD DATA ==========*/

function loadOrders(){

    orders = JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}

/*========== SAVE DATA ==========*/

function saveOrders(){

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}

/*========== FORMAT ==========*/

function rupiah(number){

    return new Intl.NumberFormat(
        "id-ID",
        {
            style:"currency",
            currency:"IDR",
            minimumFractionDigits:0
        }

    ).format(number);

}

/*========== FILTER ==========*/

function getFilteredOrders(){

    let data=[...orders];

    const keyword =
    searchInput.value
    .trim()
    .toLowerCase();

    if(keyword){

        data = data.filter(order=>{

            return (

                order.invoice
                .toLowerCase()
                .includes(keyword)

                ||

                order.nama
                .toLowerCase()
                .includes(keyword)

            );

        });

    }

    if(currentFilter!="Semua"){

        data=data.filter(order=>

            order.status===currentFilter

        );

    }

    return data;

}

/*========== BADGE ==========*/

function badgeClass(status){

    switch(status){

        case "Menunggu Verifikasi":

            return "waiting";

        case "Diproses":

            return "process";

        case "Produksi":

            return "production";

        case "Pengiriman":

            return "delivery";

        case "Selesai":

            return "finish";

        default:

            return "waiting";

    }

}

/*========== RENDER ==========*/

function renderOrders(){

    const data =
    getFilteredOrders();

    orderList.innerHTML="";

    if(data.length===0){

        orderList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-box-open"></i>

            <h3>

                Tidak ada pesanan

            </h3>

        </div>

        `;

        return;

    }

    data.forEach(order=>{

        const totalItem=

        order.produk.reduce(

            (a,b)=>a+b.qty,

            0

        );

        orderList.innerHTML +=`

        <div class="order-card">

            <div class="card-header">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="badge ${badgeClass(order.status)}">

                    ${order.status}

                </span>

            </div>

            <div class="customer">

                <i class="fa-solid fa-user"></i>

                <span>

                    ${order.nama}

                </span>

            </div>

            <div class="summary">

                <div>

                    <label>Total</label>

                    <h4>

                        ${rupiah(order.total)}

                    </h4>

                </div>

                <div>

                    <label>Item</label>

                    <h4>

                        ${totalItem} Menu

                    </h4>

                </div>

            </div>

            <button

                class="detail-btn"

                data-invoice="${order.invoice}">

                <i class="fa-solid fa-eye"></i>

                Lihat Detail

            </button>

        </div>

        `;

    });

}

/*========== SEARCH ==========*/

searchInput.addEventListener(

"input",

renderOrders

);

/*========== FILTER ==========*/

filterButtons.forEach(btn=>{

    btn.onclick=function(){

        filterButtons.forEach(item=>

            item.classList.remove("active")

        );

        this.classList.add("active");

        currentFilter=this.dataset.status;

        renderOrders();

    }

});

/*========== REFRESH ==========*/

refreshBtn.onclick=function(){

    loadOrders();

    renderOrders();

};

/*========== BACK ==========*/

backBtn.onclick=function(){

    location.href="dashboard.html";

};

/*========== LOAD ==========*/

loadOrders();

renderOrders();
/*=====================================
    DAFTAR PESANAN V2
    BAGIAN 2
=====================================*/

/*========== ELEMENT ==========*/

const detailModal =
document.getElementById("detailModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const statusBtn =
document.getElementById("statusBtn");

let selectedOrder = null;

/*========== OPEN DETAIL ==========*/

document.addEventListener("click",function(e){

    const btn=e.target.closest(".detail-btn");

    if(!btn) return;

    const invoice=

    btn.dataset.invoice;

    selectedOrder=

    orders.find(item=>

        item.invoice===invoice

    );

    if(!selectedOrder) return;

    let products="";

    selectedOrder.produk.forEach(item=>{

        products+=`

        <div class="product-item">

            <img
            src="${item.gambar}"
            class="product-image">

            <div class="product-info">

                <h4>${item.nama}</h4>

                <small>${rupiah(item.harga)}</small>

                <p>Qty : ${item.qty}</p>

            </div>

            <b>

                ${rupiah(item.qty*item.harga)}

            </b>

        </div>

        `;

    });

    modalBody.innerHTML=`

        <div class="detail-group">

            <label>Invoice</label>

            <p>${selectedOrder.invoice}</p>

        </div>

        <div class="detail-group">

            <label>Nama</label>

            <p>${selectedOrder.nama}</p>

        </div>

        <div class="detail-group">

            <label>Email</label>

            <p>${selectedOrder.email}</p>

        </div>

        <div class="detail-group">

            <label>Tanggal</label>

            <p>${selectedOrder.tanggal}</p>

        </div>

        <div class="detail-group">

            <label>Metode</label>

            <p>${selectedOrder.metode}</p>

        </div>

        <div class="detail-group">

            <label>Status</label>

            <p>${selectedOrder.status}</p>

        </div>

        <div class="detail-group">

            <label>Menu</label>

            ${products}

        </div>

        <div class="detail-group">

            <label>Total</label>

            <h3>

                ${rupiah(selectedOrder.total)}

            </h3>

        </div>

    `;

    if(selectedOrder.bukti){

        modalBody.innerHTML +=`

        <div class="detail-group">

            <label>Bukti Pembayaran</label>

            <img
            src="${selectedOrder.bukti}"
            class="payment-image">

        </div>

        `;

    }

    changeButtonText();

    detailModal.style.display="flex";

});

/*========== BUTTON STATUS ==========*/

function changeButtonText(){

    statusBtn.disabled=false;

    switch(selectedOrder.status){

        case "Menunggu Verifikasi":

            statusBtn.textContent="Verifikasi";

        break;

        case "Diproses":

            statusBtn.textContent="Masuk Produksi";

        break;

        case "Produksi":

            statusBtn.textContent="Kirim Pesanan";

        break;

        case "Pengiriman":

            statusBtn.textContent="Selesaikan";

        break;

        case "Selesai":

            statusBtn.textContent="Pesanan Selesai";

            statusBtn.disabled=true;

        break;

    }

}

/*========== UPDATE STATUS ==========*/

statusBtn.onclick=function(){

    if(!selectedOrder) return;

    switch(selectedOrder.status){

        case "Menunggu Verifikasi":

            selectedOrder.status="Diproses";

        break;

        case "Diproses":

            selectedOrder.status="Produksi";

        break;

        case "Produksi":

            selectedOrder.status="Pengiriman";

        break;

        case "Pengiriman":

            selectedOrder.status="Selesai";

        break;

    }

    const index=

    orders.findIndex(item=>

        item.invoice===selectedOrder.invoice

    );

    if(index!=-1){

        orders[index]=selectedOrder;

    }

    saveOrders();

    const lastOrder=
    JSON.parse(

        localStorage.getItem("lastOrder")

    );

    if(

        lastOrder &&

        lastOrder.invoice===selectedOrder.invoice

    ){

        localStorage.setItem(

            "lastOrder",

            JSON.stringify(selectedOrder)

        );

    }

    renderOrders();

    detailModal.style.display="none";

};

/*========== CLOSE ==========*/

closeModal.onclick=function(){

    detailModal.style.display="none";

}

window.onclick=function(e){

    if(e.target===detailModal){

        detailModal.style.display="none";

    }

}

/*========== STORAGE ==========*/

window.addEventListener(

"storage",

function(){

    loadOrders();

    renderOrders();

});