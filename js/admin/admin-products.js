document.addEventListener("DOMContentLoaded", async ()=>{
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("admin");
        window.location.href="../index.html";
    });

    const form = document.getElementById("addProductForm");
    const tableDiv = document.getElementById("productTable");

    async function fetchProducts(){
        const { data: products } = await supabase.from("products").select("*");
        if(!products || products.length===0){ tableDiv.innerHTML="<p>Tidak ada produk</p>"; return; }

        let html=`<table class="table"><tr><th>Nama</th><th>Harga</th><th>Gambar</th><th>Aksi</th></tr>`;
        products.forEach(p=>{
            html += `<tr>
                <td>${p.name}</td>
                <td>Rp${p.price}</td>
                <td><img src="${p.image}" width="50"/></td>
                <td>
                    <button onclick="deleteProduct('${p.id}')">Hapus</button>
                </td>
            </tr>`;
        });
        html += `</table>`;
        tableDiv.innerHTML = html;
    }

    window.deleteProduct = async (id)=>{
        if(confirm("Hapus produk ini?")){
            await supabase.from("products").delete().eq("id",id);
            fetchProducts();
        }
    }

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const price = parseInt(document.getElementById("price").value);
        const image = document.getElementById("image").value.trim();

        await supabase.from("products").insert([{name,price,image}]);
        form.reset();
        fetchProducts();
    });

    fetchProducts();
});
