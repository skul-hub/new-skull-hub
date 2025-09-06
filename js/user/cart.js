document.addEventListener("DOMContentLoaded", async () => {
    const cartContainer = document.getElementById("cartContainer");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Keranjang kosong</p>";
            return;
        }

        let html = `<table class="table">
            <tr><th>Nama Produk</th><th>Harga</th><th>Qty</th><th>Subtotal</th><th>Aksi</th></tr>`;
        cart.forEach((item, index) => {
            html += `<tr>
                <td>${item.name}</td>
                <td>Rp${item.price}</td>
                <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)"/></td>
                <td>Rp${item.price * item.qty}</td>
                <td><button onclick="removeItem(${index})">Hapus</button></td>
            </tr>`;
        });
        html += `</table>
            <button onclick="checkout()">Checkout</button>`;
        cartContainer.innerHTML = html;
    }

    window.updateQty = (index, value) => {
        cart[index].qty = parseInt(value);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.checkout = async () => {
        if (cart.length === 0) return alert("Keranjang kosong");
        const buyer_name = prompt("Masukkan Nama Pembeli");
        const phone = prompt("Masukkan Nomor Telepon");
        const telegram = prompt("Telegram (opsional)");

        if (!buyer_name || !phone) return alert("Nama dan Nomor wajib diisi");

        const userId = localStorage.getItem("userId");

        for (let item of cart) {
            await supabase.from("orders").insert([{
                user_id: userId,
                product_id: item.id,
                product_name: item.name,
                qty: item.qty,
                price: item.price,
                buyer_name,
                phone,
                telegram,
                status: "pending"
            }]);
        }

        localStorage.removeItem("cart");
        cart = [];
        alert("Checkout berhasil, tunggu konfirmasi admin!");
        renderCart();
    }

    renderCart();
});
