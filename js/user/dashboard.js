document.addEventListener("DOMContentLoaded", async ()=>{
    if(!localStorage.getItem("userId")){window.location.href="../index.html";}
    const navbar=document.querySelector(".navbar");
    navbar.innerHTML=`<a href="dashboard.html">Beranda</a><a href="keranjang.html">Keranjang</a><a href="history.html">History</a><a href="#" id="logoutBtn">Logout</a>`;
    document.getElementById("logoutBtn").onclick=()=>{localStorage.removeItem("userId"); localStorage.removeItem("cart"); window.location.href="../index.html";}

    const container=document.getElementById("productContainer");
    const {data:products}=await supabase.from("products").select("*");
    if(!products || products.length===0){container.innerHTML="<p>Tidak ada produk</p>"; return;}
    let html="";
    products.forEach(p=>{
        html+=`<div class="card">
            <img src="${p.image}" />
            <h3>${p.name}</h3>
            <p>Rp${p.price}</p>
            <button onclick="buy('${p.id}','${p.name}',${p.price})">Buy</button>
            <button onclick="addToCart('${p.id}','${p.name}',${p.price},'${p.image}')">Masukkan ke Keranjang</button>
        </div>`;
    });
    container.innerHTML=html;

    supabase.from("products").on('*',payload=>{location.reload();}).subscribe();
});

window.buy=async(id,name,price)=>{
    const n=prompt("Nama"); const ph=prompt("No HP"); const t=prompt("Telegram (opsional)");
    if(!n||!ph){alert("Nama & No wajib"); return;}
    const uid=localStorage.getItem("userId");
    await supabase.from("orders").insert([{user_id:uid,product_id:id,product_name:name,qty:1,price,buyer_name:n,phone:ph,telegram:t,status:"pending"}]);
    alert("Order berhasil!"); location.reload();
};

window.addToCart=(id,name,price,image)=>{
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    const exist=cart.find(item=>item.id===id);
    if(exist){exist.qty+=1;}else{cart.push({id,name,price,image,qty:1});}
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
}
