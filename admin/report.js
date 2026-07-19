/*=====================================
          REPORT.JS V3
            BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const reportList =
document.getElementById("reportList");

const searchInput =
document.getElementById("searchInput");

const startDate =
document.getElementById("startDate");

const endDate =
document.getElementById("endDate");

const refreshBtn =
document.getElementById("refreshBtn");

const backBtn =
document.getElementById("backBtn");

const totalOrder =
document.getElementById("totalOrder");

const finishOrder =
document.getElementById("finishOrder");

const totalIncome =
document.getElementById("totalIncome");

/*========== DATA ==========*/

let orders = [];
let selectedOrder = null;

/*========== LOAD ==========*/

function loadOrders(){

    const data =
    localStorage.getItem("orders");

    orders = data
        ? JSON.parse(data)
        : [];

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

function getReports(){

    const keyword =
    searchInput.value
    .trim()
    .toLowerCase();

    const start =
    startDate.value;

    const end =
    endDate.value;

    return orders.filter(order=>{

        if(order.status!=="Selesai")
            return false;

        const search =

            order.invoice
            .toLowerCase()
            .includes(keyword)

            ||

            order.nama
            .toLowerCase()
            .includes(keyword);

        if(!search)
            return false;

        if(start && order.tanggal < start)
            return false;

        if(end && order.tanggal > end)
            return false;

        return true;

    });

}

/*========== STATISTIC ==========*/

function renderStatistic(data){

    totalOrder.textContent =
    orders.length;

    finishOrder.textContent =
    data.length;

    let income = 0;

    data.forEach(item=>{

        income += Number(item.total);

    });

    totalIncome.textContent =
    rupiah(income);

}

/*========== RENDER ==========*/

function renderReport(){

    const data =
    getReports();

    renderStatistic(data);

    reportList.innerHTML="";

    if(data.length===0){

        reportList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-file-circle-xmark"></i>

            <h3>

                Tidak Ada Laporan

            </h3>

            <p>

                Belum ada transaksi selesai.

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

        reportList.innerHTML += `

        <div class="report-card">

            <div class="report-header">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="status">

                    Selesai

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

                        Total

                    </label>

                    <h4>

                        ${rupiah(order.total)}

                    </h4>

                </div>

                <div>

                    <label>

                        Menu

                    </label>

                    <h4>

                        ${totalMenu}

                    </h4>

                </div>

            </div>

            <button
                class="detail-btn"
                data-invoice="${order.invoice}">

                <i class="fa-solid fa-eye"></i>

                Detail

            </button>

        </div>

        `;

    });

}

/*========== EVENT ==========*/

searchInput.addEventListener(

    "input",

    renderReport

);

startDate.addEventListener(

    "change",

    renderReport

);

endDate.addEventListener(

    "change",

    renderReport

);

refreshBtn.onclick=function(){

    loadOrders();

    renderReport();

}

backBtn.onclick=function(){

    location.href="dashboard.html";

}

/*========== LOAD AWAL ==========*/

loadOrders();

renderReport();
/*=====================================
          REPORT.JS V3
            BAGIAN 2
=====================================*/

/*========== ELEMENT ==========*/

const reportModal =
document.getElementById("reportModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const printBtn =
document.getElementById("printBtn");

const excelBtn =
document.getElementById("excelBtn");

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

            <label>Tanggal</label>

            <p>${selectedOrder.tanggal}</p>

        </div>

        <div class="detail-group">

            <label>Alamat</label>

            <p>${selectedOrder.address || "-"}</p>

        </div>

        <div class="detail-group">

            <label>Kurir</label>

            <p>${selectedOrder.courierName || "-"}</p>

        </div>

        <div class="detail-group">

            <label>Nomor Resi</label>

            <p>${selectedOrder.trackingNumber || "-"}</p>

        </div>

        <div class="detail-group">

            <label>Estimasi</label>

            <p>${selectedOrder.estimateDate || "-"}</p>

        </div>

        <div class="detail-group">

            <label>Daftar Menu</label>

            ${products}

        </div>

        <div class="detail-group">

            <label>Total Pembayaran</label>

            <h3>

                ${rupiah(selectedOrder.total)}

            </h3>

        </div>

    `;

    reportModal.style.display="flex";

});

/*========== CLOSE ==========*/

closeModal.onclick=function(){

    reportModal.style.display="none";

}

window.addEventListener("click",function(e){

    if(e.target===reportModal){

        reportModal.style.display="none";

    }

});

/*========== PRINT ==========*/

printBtn.onclick=function(){

    window.print();

}

/*========== EXPORT EXCEL ==========*/

excelBtn.onclick=function(){

    const data = getReports().map(item=>({

        Invoice : item.invoice,

        Nama : item.nama,

        Tanggal : item.tanggal,

        Total : item.total,

        Status : item.status,

        Kurir : item.courierName || "-",

        Resi : item.trackingNumber || "-",

        Estimasi : item.estimateDate || "-"

    }));

    const workbook = XLSX.utils.book_new();

    const worksheet =
    XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Laporan"

    );

    XLSX.writeFile(

        workbook,

        "Laporan_Catering_Arrafi.xlsx"

    );

}

/*========== STORAGE ==========*/

window.addEventListener("storage",function(){

    loadOrders();

    renderReport();

});