document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){ window.location.href = "../index.html"; return; }

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("user");
        window.location.href = "../index.html";
    });

    const productsContainer = document.getElementById("productsContainer");

    async function fetchProducts(){
        const { data: products, error } = await supabase
            .from("products")
            .select("*");
        productsContainer.innerHTML = "";
        if(products){
            products.forEach(product=>{
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Harga: Rp${product.price}</p>
                    <button class="buy-btn" onclick="buyProduct('${product.id}','${product.name}',${product.price})">Buy</button>
                    <button class="cart-btn" onclick="addToCart('${product.id}','${product.name}',${product.price})">Masukkan ke Keranjang</button>
                `;
                productsContainer.appendChild(card);
            });
        }
    }

    fetchProducts();

    window.buyProduct = async (id,name,price) => {
        const buyer = prompt("Masukkan nama anda:");
        const phone = prompt("Nomor Whatsapp:");
        const telegram = prompt("Telegram (opsional):");
        if(!buyer || !phone) return alert("Nama dan Whatsapp wajib!");

        await supabase.from("orders").insert([{
            user_id: user.id,
            product_id: id,
            product_name: name,
            qty:1,
            price: price,
            buyer_name: buyer,
            phone,
            telegram,
            status: "pending"
        }]);
        alert("Pesanan terkirim ke admin!");
    };

    window.addToCart = async (id,name,price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist = cart.find(item=>item.id===id);
        if(exist) exist.qty += 1;
        else cart.push({id,name,price,qty:1});
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Berhasil ditambahkan ke keranjang!");
    };

});
