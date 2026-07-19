/*=====================================
        DELIVERY.JS V3
            BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const deliveryList =
document.getElementById("deliveryList");

const searchInput =
document.getElementById("searchInput");

const refreshBtn =
document.getElementById("refreshBtn");

const backBtn =
document.getElementById("backBtn");

const deliveryCount =
document.getElementById("deliveryCount");

/*========== DATA ==========*/

let orders = [];

/*========== LOAD DATA ==========*/

function loadOrders(){

    const data =
    localStorage.getItem("orders");

    orders = data
        ? JSON.parse(data)
        : [];

}

/*========== SAVE DATA ==========*/

function saveOrders(){

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}

/*========== FORMAT RUPIAH ==========*/

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

/*========== FILTER DATA ==========*/

function getDeliveryOrders(){

    const keyword =
    searchInput.value
    .trim()
    .toLowerCase();

    return orders.filter(order=>{

        const status =
        order.status==="Pengiriman";

        const search =

            order.invoice
            .toLowerCase()
            .includes(keyword)

            ||

            order.nama
            .toLowerCase()
            .includes(keyword);

        return status && search;

    });

}

/*========== RENDER ==========*/

function renderDelivery(){

    const data =
    getDeliveryOrders();

    deliveryCount.textContent =
    data.length;

    deliveryList.innerHTML="";

    if(data.length===0){

        deliveryList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-truck-fast"></i>

            <h3>

                Tidak Ada Pengiriman

            </h3>

            <p>

                Semua pesanan telah selesai.

            </p>

        </div>

        `;

        return;

    }

    data.forEach(order=>{

        let totalMenu = 0;

        if(order.produk){

            order.produk.forEach(item=>{

                totalMenu +=
                Number(item.qty);

            });

        }

        deliveryList.innerHTML +=`

        <div class="delivery-card">

            <div class="delivery-header">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="status delivery">

                    Pengiriman

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

                    <label>

                        Total Menu

                    </label>

                    <h4>

                        ${totalMenu} Menu

                    </h4>

                </div>

                <div>

                    <label>

                        Total

                    </label>

                    <h4>

                        ${rupiah(order.total)}

                    </h4>

                </div>

            </div>

            <button
                class="detail-btn"
                data-invoice="${order.invoice}">

                <i class="fa-solid fa-truck-fast"></i>

                Lihat Pengiriman

            </button>

        </div>

        `;

    });

}

/*========== SEARCH ==========*/

searchInput.addEventListener(

    "input",

    renderDelivery

);

/*========== REFRESH ==========*/

refreshBtn.onclick=function(){

    loadOrders();

    renderDelivery();

}

/*========== BACK ==========*/

backBtn.onclick=function(){

    location.href="dashboard.html";

}

/*========== LOAD AWAL ==========*/

loadOrders();

renderDelivery();
/*=====================================
        DELIVERY.JS V3
            BAGIAN 2
=====================================*/

/*========== ELEMENT ==========*/

const deliveryModal =
document.getElementById("deliveryModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const courierName =
document.getElementById("courierName");

const trackingNumber =
document.getElementById("trackingNumber");

const estimateDate =
document.getElementById("estimateDate");

const finishBtn =
document.getElementById("finishBtn");

let selectedOrder = null;

/*========== DETAIL ==========*/

document.addEventListener("click",function(e){

    const btn = e.target.closest(".detail-btn");

    if(!btn) return;

    const invoice = btn.dataset.invoice;

    selectedOrder = orders.find(order=>

        order.invoice===invoice

    );

    if(!selectedOrder) return;

    let products = "";

    (selectedOrder.produk || []).forEach(item=>{

        products += `

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

                ${rupiah(item.qty * item.harga)}

            </b>

        </div>

        `;

    });

    modalBody.innerHTML = `

        <div class="detail-group">

            <label>Invoice</label>

            <p>${selectedOrder.invoice}</p>

        </div>

        <div class="detail-group">

            <label>Nama Pelanggan</label>

            <p>${selectedOrder.nama}</p>

        </div>

        <div class="detail-group">

            <label>Alamat</label>

            <p>${selectedOrder.address || "-"}</p>

        </div>

        <div class="detail-group">

            <label>Tanggal Pesanan</label>

            <p>${selectedOrder.tanggal}</p>

        </div>

        <div class="detail-group">

            <label>Daftar Menu</label>

            ${products}

        </div>

        <div class="detail-group">

            <label>Total Pembayaran</label>

            <h3>${rupiah(selectedOrder.total)}</h3>

        </div>

    `;

    courierName.value =
    selectedOrder.courierName || "";

    trackingNumber.value =
    selectedOrder.trackingNumber || "";

    estimateDate.value =
    selectedOrder.estimateDate || "";

    deliveryModal.style.display="flex";

});

/*========== SIMPAN INPUT ==========*/

courierName.addEventListener("input",function(){

    if(selectedOrder){

        selectedOrder.courierName = this.value;

    }

});

trackingNumber.addEventListener("input",function(){

    if(selectedOrder){

        selectedOrder.trackingNumber = this.value;

    }

});

estimateDate.addEventListener("change",function(){

    if(selectedOrder){

        selectedOrder.estimateDate = this.value;

    }

});

/*========== SELESAIKAN PESANAN ==========*/

finishBtn.onclick=function(){

    if(!selectedOrder){

        alert("Pilih pesanan terlebih dahulu.");

        return;

    }

    if(courierName.value===""){

        alert("Nama kurir belum diisi.");

        return;

    }

    if(trackingNumber.value===""){

        alert("Nomor resi belum diisi.");

        return;

    }

    if(estimateDate.value===""){

        alert("Estimasi tiba belum dipilih.");

        return;

    }

    const index = orders.findIndex(order=>

        order.invoice===selectedOrder.invoice

    );

    if(index===-1) return;

    orders[index].courierName =
    courierName.value;

    orders[index].trackingNumber =
    trackingNumber.value;

    orders[index].estimateDate =
    estimateDate.value;

    orders[index].status =
    "Selesai";

    saveOrders();

    deliveryModal.style.display="none";

    loadOrders();

    renderDelivery();

    alert("Pesanan berhasil diselesaikan.");

}

/*========== CLOSE MODAL ==========*/

closeModal.onclick=function(){

    deliveryModal.style.display="none";

}

window.addEventListener("click",function(e){

    if(e.target===deliveryModal){

        deliveryModal.style.display="none";

    }

});

/*========== STORAGE ==========*/

window.addEventListener("storage",function(){

    loadOrders();

    renderDelivery();

});