function loadCart(){
    const cart=JSON.parse(localStorage.getItem("cart"))||[];
    const container=document.getElementById("cartContainer");
    if(cart.length===0){container.innerHTML="<p>Keranjang kosong</p>"; return;}
    let html=`<table class="table"><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Aksi</th></tr>`;
    cart.forEach((p,i)=>{
        html+=`<tr>
            <td>${p.name}</td>
            <td><input type="number" min="1" value="${p.qty}" onchange="updateQty(${i},this.value)"></td>
            <td>Rp${p.price*p.qty}</td>
            <td><button onclick="removeItem(${i})">Hapus</button></td>
        </tr>`;
    });
    html+=`</table><button onclick="checkout()">Checkout</button>`;
    container.innerHTML=html;
}

function updateQty(index,value){
    let cart=JSON.parse(localStorage.getItem("cart"));
    cart[index].qty=parseInt(value);
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
}

function removeItem(index){
    let cart=JSON.parse(localStorage.getItem("cart"));
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
}

async function checkout(){
    const cart=JSON.parse(localStorage.getItem("cart"))||[];
    if(cart.length===0) return alert("Keranjang kosong");
    const buyer_name=prompt("Nama"); const phone=prompt("Nomor HP"); const telegram=prompt("Telegram (opsional)");
    if(!buyer_name||!phone) return alert("Nama & Nomor wajib");
    const userId=localStorage.getItem("userId");
    for(let item of cart){
        await supabase.from("orders").insert([{user_id:userId,product_id:item.id,product_name:item.name,qty:item.qty,price:item.price,buyer_name,phone,telegram,status:"pending"}]);
    }
    localStorage.removeItem("cart");
    alert("Checkout berhasil!"); window.location.href="history.html";
}
