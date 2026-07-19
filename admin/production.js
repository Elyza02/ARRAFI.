 /*=====================================
        PRODUCTION.JS V3
            BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const productionList = document.getElementById("productionList");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const backBtn = document.getElementById("backBtn");
const productionCount = document.getElementById("productionCount");

const productionModal = document.getElementById("productionModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const productionDate = document.getElementById("productionDate");
const productionTime = document.getElementById("productionTime");
const productionNote = document.getElementById("productionNote");
const deliveryBtn = document.getElementById("deliveryBtn");

/*========== DATA ==========*/

let orders = [];
let selectedOrder = null;

/*========== LOAD DATA ==========*/

function loadOrders(){

    const data = localStorage.getItem("orders");

    orders = data ? JSON.parse(data) : [];

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

    return new Intl.NumberFormat("id-ID",{

        style:"currency",
        currency:"IDR",
        minimumFractionDigits:0

    }).format(number);

}

/*========== FILTER ==========*/

function getData(){

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    return orders.filter(order=>{

        const cocokStatus =
            order.status==="Produksi";

        const cocokCari =

            order.invoice.toLowerCase().includes(keyword)

            ||

            order.nama.toLowerCase().includes(keyword);

        return cocokStatus && cocokCari;

    });

}

/*========== RENDER ==========*/

function renderProduction(){

    const data = getData();

    productionCount.textContent = data.length;

    productionList.innerHTML = "";

    if(data.length===0){

        productionList.innerHTML = `

        <div class="empty">

            <i class="fa-solid fa-industry"></i>

            <h3>Tidak Ada Produksi</h3>

            <p>Belum ada pesanan produksi.</p>

        </div>

        `;

        return;

    }

    data.forEach(order=>{

        let totalMenu = 0;

        if(order.produk){

            order.produk.forEach(item=>{

                totalMenu += Number(item.qty);

            });

        }

        productionList.innerHTML += `

        <div class="production-card">

            <div class="production-header">

                <div>

                    <h3>${order.invoice}</h3>

                    <small>${order.tanggal}</small>

                </div>

                <span class="status production">

                    Produksi

                </span>

            </div>

            <div class="customer">

                <i class="fa-solid fa-user"></i>

                <span>${order.nama}</span>

            </div>

            <div class="summary">

                <div>

                    <label>Total Menu</label>

                    <h4>${totalMenu} Menu</h4>

                </div>

                <div>

                    <label>Total</label>

                    <h4>${rupiah(order.total)}</h4>

                </div>

            </div>

            <button
                class="detail-btn"
                data-invoice="${order.invoice}">

                <i class="fa-solid fa-eye"></i>

                Lihat Produksi

            </button>

        </div>

        `;

    });

}

/*========== SEARCH ==========*/

searchInput.addEventListener(

    "input",

    renderProduction

);

/*========== REFRESH ==========*/

refreshBtn.onclick=function(){

    loadOrders();

    renderProduction();

}

/*========== BACK ==========*/

backBtn.onclick=function(){

    location.href="dashboard.html";

}

/*========== LOAD AWAL ==========*/

loadOrders();

renderProduction();
/*=====================================
        PRODUCTION.JS V3
            BAGIAN 2
=====================================*/

/*========== DETAIL PRODUKSI ==========*/

document.addEventListener("click",function(e){

    const btn = e.target.closest(".detail-btn");

    if(!btn) return;

    const invoice = btn.dataset.invoice;

    selectedOrder = orders.find(order=>

        order.invoice===invoice

    );

    if(!selectedOrder) return;

    let produkHTML="";

    (selectedOrder.produk || []).forEach(item=>{

        produkHTML += `

        <div class="product-item">

            <img
                src="${item.gambar}"
                class="product-image"
                onerror="this.src='../assets/menu/default.jpg'">

            <div class="product-info">

                <h4>${item.nama}</h4>

                <small>${rupiah(item.harga)}</small>

                <p>Qty : ${item.qty}</p>

            </div>

            <b>

                ${rupiah(item.harga*item.qty)}

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

            <label>Tanggal</label>

            <p>${selectedOrder.tanggal}</p>

        </div>

        <div class="detail-group">

            <label>Metode Pembayaran</label>

            <p>${selectedOrder.metode}</p>

        </div>

        <div class="detail-group">

            <label>Daftar Menu</label>

            ${produkHTML}

        </div>

        <div class="detail-group">

            <label>Total Pembayaran</label>

            <h3>${rupiah(selectedOrder.total)}</h3>

        </div>

    `;

    productionDate.value =
        selectedOrder.productionDate || "";

    productionTime.value =
        selectedOrder.productionTime || "";

    productionNote.value =
        selectedOrder.kitchenNote || "";

    productionModal.style.display="flex";

});

/*========== SIMPAN JADWAL ==========*/

productionDate.addEventListener("change",function(){

    if(selectedOrder){

        selectedOrder.productionDate = this.value;

    }

});

productionTime.addEventListener("change",function(){

    if(selectedOrder){

        selectedOrder.productionTime = this.value;

    }

});

/*========== KIRIM KE PENGIRIMAN ==========*/

deliveryBtn.onclick=function(){

    if(!selectedOrder){

        alert("Pilih pesanan terlebih dahulu.");

        return;

    }

    if(productionDate.value===""){

        alert("Tanggal produksi belum dipilih.");

        return;

    }

    if(productionTime.value===""){

        alert("Jam produksi belum dipilih.");

        return;

    }

    const index = orders.findIndex(order=>

        order.invoice===selectedOrder.invoice

    );

    if(index===-1) return;

    orders[index].productionDate =
        productionDate.value;

    orders[index].productionTime =
        productionTime.value;

    orders[index].status =
        "Pengiriman";

    saveOrders();

    productionModal.style.display="none";

    loadOrders();

    renderProduction();

    alert("Pesanan berhasil dipindahkan ke Pengiriman.");

};

/*========== CLOSE MODAL ==========*/

closeModal.onclick=function(){

    productionModal.style.display="none";

}

window.addEventListener("click",function(e){

    if(e.target===productionModal){

        productionModal.style.display="none";

    }

});

/*========== STORAGE ==========*/

window.addEventListener("storage",function(){

    loadOrders();

    renderProduction();

});