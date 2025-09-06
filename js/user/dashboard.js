document.addEventListener("DOMContentLoaded", async ()=>{
    const navbar = document.querySelector(".navbar");
    navbar.innerHTML = `
        <a href="dashboard.html">Beranda</a>
        <a href="keranjang.html">Keranjang</a>
        <a href="history.html">History</a>
        <a href="#" id="logoutBtn">Logout</a>
    `;

    document.getElementById("logoutBtn").addEventListener("click", ()=>{
        localStorage.removeItem("userId");
        window.location.href="../index.html";
    });

    const container = document.getElementById("productContainer");
    const { data: products } = await supabase.from("products").select("*");

    if(!products || products.length===0){ container.innerHTML="<p>Tidak ada produk</p>"; return; }

    let html="";
    products.forEach(p=>{
        html+=`
        <div class="card">
            <img src="${p.image}" />
            <h3>${p.name}</h3>
            <p>Rp${p.price}</p>
            <button onclick="buyProduct('${p.id}','${p.name}',${p.price})">Buy</button>
        </div>`;
    });
    container.innerHTML = html;
});

window.buyProduct = async (productId, productName, price) => {
    const buyer_name = prompt("Masukkan Nama Pembeli");
    const phone = prompt("Masukkan Nomor Telepon");
    const telegram = prompt("Telegram (opsional)");

    if(!buyer_name || !phone) return alert("Nama dan Nomor wajib diisi");

    const userId = localStorage.getItem("userId");

    await supabase.from("orders").insert([{
        user_id: userId,
        product_id: productId,
        product_name: productName,
        qty:1,
        price: price,
        buyer_name,
        phone,
        telegram,
        status: "pending"
    }]);

    alert("Berhasil order, tunggu konfirmasi admin!");
};
