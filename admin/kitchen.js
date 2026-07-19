/*=====================================
        KITCHEN.JS V2
          BAGIAN 1
=====================================*/

/*========== ELEMENT ==========*/

const kitchenList =
document.getElementById("kitchenList");

const searchInput =
document.getElementById("searchInput");

const refreshBtn =
document.getElementById("refreshBtn");

const backBtn =
document.getElementById("backBtn");

const processCount =
document.getElementById("processCount");

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

/*========== FILTER DATA ==========*/

function getKitchenOrders(){

    const keyword =

    searchInput.value

    .trim()

    .toLowerCase();

    return orders.filter(order=>{

        const process =

        order.status==="Diproses";

        const search =

        order.invoice

        .toLowerCase()

        .includes(keyword)

        ||

        order.nama

        .toLowerCase()

        .includes(keyword);

        return process && search;

    });

}

/*========== RENDER ==========*/

function renderKitchen(){

    const data =

    getKitchenOrders();

    kitchenList.innerHTML="";

    processCount.textContent=data.length;

    if(data.length===0){

        kitchenList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-utensils"></i>

            <h3>

                Tidak Ada Pesanan

            </h3>

            <p>

                Semua pesanan telah selesai diproses.

            </p>

        </div>

        `;

        return;

    }

    data.forEach(order=>{

        const totalItem =

        order.produk.reduce(

            (total,item)=>

            total+item.qty,

            0

        );

        kitchenList.innerHTML +=`

        <div class="kitchen-card">

            <div class="kitchen-header">

                <div>

                    <h3>

                        ${order.invoice}

                    </h3>

                    <small>

                        ${order.tanggal}

                    </small>

                </div>

                <span class="status process">

                    Diproses

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

                    <label>Total Menu</label>

                    <h4>

                        ${totalItem} Menu

                    </h4>

                </div>

                <div>

                    <label>Total</label>

                    <h4>

                        ${rupiah(order.total)}

                    </h4>

                </div>

            </div>

            <button

                class="detail-btn"

                data-invoice="${order.invoice}">

                <i class="fa-solid fa-fire-burner"></i>

                Mulai Memasak

            </button>

        </div>

        `;

    });

}

/*========== SEARCH ==========*/

searchInput.addEventListener(

"input",

renderKitchen

);

/*========== REFRESH ==========*/

refreshBtn.onclick=function(){

    loadOrders();

    renderKitchen();

}

/*========== BACK ==========*/

backBtn.onclick=function(){

    window.location.href=

    "dashboard.html";

}

/*========== LOAD ==========*/

loadOrders();

renderKitchen();
/*=====================================
        KITCHEN.JS V2
          BAGIAN 2
=====================================*/

/*========== ELEMENT ==========*/

const kitchenModal =
document.getElementById("kitchenModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const kitchenNote =
document.getElementById("kitchenNote");

const productionBtn =
document.getElementById("productionBtn");

let selectedOrder = null;

/*========== DETAIL ==========*/

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

        products +=`

        <div class="product-item">

            <img
                src="${item.gambar}"
                class="product-image">

            <div class="product-info">

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

            <label>Nama Pelanggan</label>

            <p>${selectedOrder.nama}</p>

        </div>

        <div class="detail-group">

            <label>Tanggal</label>

            <p>${selectedOrder.tanggal}</p>

        </div>

        <div class="detail-group">

            <label>Alamat Pengiriman</label>

            <p>${selectedOrder.address || "-"}</p>

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

    kitchenNote.value=

    selectedOrder.kitchenNote || "";

    kitchenModal.style.display="flex";

});

/*========== SIMPAN CATATAN ==========*/

kitchenNote.addEventListener("input",function(){

    if(!selectedOrder) return;

    selectedOrder.kitchenNote=

    this.value;

});

/*========== MASUK PRODUKSI ==========*/

productionBtn.onclick=function(){

    if(!selectedOrder) return;

    const index=

    orders.findIndex(item=>

        item.invoice===selectedOrder.invoice

    );

    if(index===-1) return;

    orders[index].kitchenNote=

    kitchenNote.value;

    orders[index].status=

    "Produksi";

    saveOrders();

    kitchenModal.style.display="none";

    loadOrders();

    renderKitchen();

    alert(

        "Pesanan berhasil dipindahkan ke Produksi."

    );

}

/*========== CLOSE MODAL ==========*/

closeModal.onclick=function(){

    kitchenModal.style.display="none";

}

window.addEventListener("click",function(e){

    if(e.target===kitchenModal){

        kitchenModal.style.display="none";

    }

});

/*========== STORAGE ==========*/

window.addEventListener("storage",function(){

    loadOrders();

    renderKitchen();

});