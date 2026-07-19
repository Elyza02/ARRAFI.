/*========== ELEMENT ==========*/

const paymentList =
document.getElementById("paymentList");

const searchInput =
document.getElementById("searchInput");

const refreshBtn =
document.getElementById("refreshBtn");

const backBtn =
document.getElementById("backBtn");

const waitingCount =
document.getElementById("waitingCount");

/*========== DATA ==========*/

let orders = [];

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

/*========== AMBIL DATA VERIFIKASI ==========*/

function getVerificationOrders(){

    const keyword =

    searchInput.value

    .trim()

    .toLowerCase();

    return orders.filter(order=>{

        const waiting =

        order.status==="Menunggu Verifikasi";

        const match =

        order.invoice.toLowerCase().includes(keyword)

        ||

        order.nama.toLowerCase().includes(keyword);

        return waiting && match;

    });

}

/*========== RENDER ==========*/

function renderPayments(){

    const data =

    getVerificationOrders();

    paymentList.innerHTML="";

    waitingCount.textContent=data.length;

    if(data.length===0){

        paymentList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-circle-check"></i>

            <h3>

                Tidak ada pembayaran

            </h3>

            <p>

                Semua pembayaran sudah diverifikasi.

            </p>

        </div>

        `;

        return;

    }

    data.forEach(order=>{

        paymentList.innerHTML +=`

        <div class="payment-card">

            <div class="payment-header">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="status waiting">

                    Menunggu

                </span>

            </div>

            <div class="customer">

                <i class="fa-solid fa-user"></i>

                <span>

                    ${order.nama}

                </span>

            </div>

            <div class="payment-summary">

                <div>

                    <label>Total</label>

                    <h4>

                        ${rupiah(order.total)}

                    </h4>

                </div>

                <div>

                    <label>Metode</label>

                    <h4>

                        ${order.metode}

                    </h4>

                </div>

            </div>

            <button

                class="detail-btn"

                data-invoice="${order.invoice}">

                <i class="fa-solid fa-eye"></i>

                Lihat Bukti

            </button>

        </div>

        `;

    });

}

/*========== SEARCH ==========*/

searchInput.addEventListener(

"input",

renderPayments

);

/*========== REFRESH ==========*/

refreshBtn.onclick=function(){

    loadOrders();

    renderPayments();

}

/*========== BACK ==========*/

backBtn.onclick=function(){

    location.href="dashboard.html";

}

/*========== LOAD ==========*/

loadOrders();

renderPayments();

/*========== ELEMENT ==========*/

const paymentModal =
document.getElementById("paymentModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const acceptBtn =
document.getElementById("acceptBtn");

const rejectBtn =
document.getElementById("rejectBtn");

let selectedOrder = null;

/*========== DETAIL ==========*/

document.addEventListener("click",function(e){

    const btn = e.target.closest(".detail-btn");

    if(!btn) return;

    const invoice =
    btn.dataset.invoice;

    selectedOrder =
    orders.find(item=>
        item.invoice===invoice
    );

    if(!selectedOrder) return;

    let products = "";

    selectedOrder.produk.forEach(item=>{

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

                ${rupiah(item.qty*item.harga)}

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

            <label>Email</label>

            <p>${selectedOrder.email}</p>

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

            <label>Total Pembayaran</label>

            <h3>${rupiah(selectedOrder.total)}</h3>

        </div>

        <div class="detail-group">

            <label>Daftar Menu</label>

            ${products}

        </div>

    `;

    if(selectedOrder.bukti){

        modalBody.innerHTML += `

        <div class="detail-group">

            <label>Bukti Pembayaran</label>

            <img
                src="${selectedOrder.bukti}"
                class="payment-image">

        </div>

        `;

    }

    paymentModal.style.display="flex";

});

/*========== TERIMA PEMBAYARAN ==========*/

acceptBtn.onclick = function(){

    if(!selectedOrder) return;

    const index = orders.findIndex(item=>

        item.invoice===selectedOrder.invoice

    );

    if(index===-1) return;

    orders[index].status = "Diproses";

    saveOrders();

    paymentModal.style.display="none";

    loadOrders();

    renderPayments();

    alert("Pembayaran berhasil diverifikasi.");

}

/*========== TOLAK PEMBAYARAN ==========*/

rejectBtn.onclick = function(){

    if(!selectedOrder) return;

    if(!confirm("Yakin ingin menolak pembayaran ini?")){

        return;

    }

    const index = orders.findIndex(item=>

        item.invoice===selectedOrder.invoice

    );

    if(index===-1) return;

    orders[index].status = "Pembayaran Ditolak";

    saveOrders();

    paymentModal.style.display="none";

    loadOrders();

    renderPayments();

    alert("Pembayaran berhasil ditolak.");

}

/*========== CLOSE MODAL ==========*/

closeModal.onclick=function(){

    paymentModal.style.display="none";

}

window.addEventListener("click",function(e){

    if(e.target===paymentModal){

        paymentModal.style.display="none";

    }

});

/*========== SINKRONISASI ==========*/

window.addEventListener("storage",function(){

    loadOrders();

    renderPayments();

});