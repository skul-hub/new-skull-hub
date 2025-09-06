document.addEventListener("DOMContentLoaded", async () => {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("admin");
        window.location.href = "../index.html";
    });

    const form = document.getElementById("addProductForm");
    const tableDiv = document.getElementById("productTable");

    // Fetch dan render produk
    async function fetchProducts() {
        const { data: products, error } = await supabase
            .from("products")
            .select("*")
            .order('created_at', { ascending: true });
        if (error) return alert(error.message);

        if (!products || products.length === 0) {
            tableDiv.innerHTML = "<p>Tidak ada produk</p>";
            return;
        }

        let html = `<table class="table">
            <tr><th>Nama</th><th>Harga</th><th>Gambar</th><th>Aksi</th></tr>`;
        products.forEach(p => {
            html += `<tr>
                <td>${p.name}</td>
                <td>Rp${p.price}</td>
                <td><img src="${p.image}" width="50"/></td>
                <td>
                    <button onclick="editProduct('${p.id}')">Edit</button>
                    <button onclick="deleteProduct('${p.id}')">Hapus</button>
                </td>
            </tr>`;
        });
        html += `</table>`;
        tableDiv.innerHTML = html;
    }

    // Tambah produk
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const price = parseInt(document.getElementById("price").value);
        const image = document.getElementById("image").value.trim();

        if (!name || !price || !image) return alert("Semua field wajib diisi!");

        const { error } = await supabase.from("products").insert([{ name, price, image }]);
        if (error) return alert(error.message);

        form.reset();
        fetchProducts();
    });

    // Hapus produk
    window.deleteProduct = async (id) => {
        if (!confirm("Hapus produk ini?")) return;
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) return alert(error.message);
        fetchProducts();
    }

    // Edit produk (prompt sederhana)
    window.editProduct = async (id) => {
        const name = prompt("Nama baru produk:");
        const price = prompt("Harga baru:");
        const image = prompt("URL gambar baru:");

        if (!name || !price || !image) return alert("Semua field wajib diisi!");

        const { error } = await supabase.from("products")
            .update({ name, price: parseInt(price), image })
            .eq("id", id);
        if (error) return alert(error.message);

        fetchProducts();
    }

    fetchProducts();
});
