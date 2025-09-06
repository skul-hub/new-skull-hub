document.addEventListener("DOMContentLoaded", ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){ window.location.href="../index.html"; return; }

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("user");
        window.location.href="../index.html";
    });

    const cartContainer = document.getElementById("cartContainer");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart(){
        if(cart.length===0){ cartContainer.innerHTML="<p>Keranjang kosong</p>"; return; }
        let html = `<table class="table">
            <tr><th>Nama</th><th>Harga</th><th>Qty</th><th>Subtotal</th><th>Aksi</th></tr>`;
        cart.forEach((item,index)=>{
            html += `<tr>
                <td>${item.name}</td>
                <td>Rp${item.price}</td>
                <td><input type="number" value="${item.qty}" min="1" data-index="${index}" class="qtyInput"></td>
                <td>Rp${item.price*item.qty}</td>
                <td><button onclick="removeItem(${index})">Hapus</button></td>
            </tr>`;
        });
        html += `</table><button id="checkoutBtn">Checkout</button>`;
        cartContainer.innerHTML = html;

        document.querySelectorAll(".qtyInput").forEach(input=>{
            input.addEventListener("change",(e)=>{
                const idx = e.target.dataset.index;
                cart[idx].qty = parseInt(e.target.value);
                localStorage.setItem("cart",JSON.stringify(cart));
                renderCart();
            });
        });

        document.getElementById("checkoutBtn").addEventListener("click", async ()=>{
            const buyer = prompt("Masukkan nama anda:");
            const phone = prompt("Nomor Whatsapp:");
            const telegram = prompt("Telegram (opsional):");
            if(!buyer || !phone) return alert("Nama & Whatsapp wajib!");

            for(const item of cart){
                await supabase.from("orders").insert([{
                    user_id: user.id,
                    product_id: item.id,
                    product_name: item.name,
                    qty: item.qty,
                    price: item.price,
                    buyer_name: buyer,
                    phone,
                    telegram,
                    status:"pending"
                }]);
            }
            localStorage.removeItem("cart");
            alert("Checkout berhasil, admin akan menghubungi anda!");
            window.location.href="history.html";
        });
    }

    window.removeItem = (index)=>{
        cart.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
    };

    renderCart();
});
