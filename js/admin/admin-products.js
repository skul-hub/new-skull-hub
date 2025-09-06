async function fetchProducts(){
    const {data:products}=await supabase.from("products").select("*").order("created_at",{ascending:false});
    const container=document.getElementById("productTable");
    if(!products || products.length===0){container.innerHTML="<p>Belum ada produk</p>"; return;}
    let html=`<table class="table"><tr><th>Nama</th><th>Harga</th><th>Gambar</th><th>Aksi</th></tr>`;
    products.forEach(p=>{
        html+=`<tr>
            <td><input value="${p.name}" id="name-${p.id}"></td>
            <td><input type="number" value="${p.price}" id="price-${p.id}"></td>
            <td><input value="${p.image}" id="image-${p.id}"></td>
            <td>
                <button onclick="updateProduct('${p.id}')">Update</button>
                <button onclick="deleteProduct('${p.id}')">Hapus</button>
            </td>
        </tr>`;
    });
    html+="</table>";
    container.innerHTML=html;
}

async function addProduct(name,price,image){
    await supabase.from("products").insert([{name,price,image}]);
    fetchProducts();
}

document.getElementById("addProductForm").onsubmit=async(e)=>{
    e.preventDefault();
    const name=document.getElementById("productName").value;
    const price=parseInt(document.getElementById("productPrice").value);
    const image=document.getElementById("productImage").value;
    await addProduct(name,price,image);
    document.getElementById("addProductForm").reset();
    alert("Produk berhasil ditambah");
}

async function updateProduct(id){
    const name=document.getElementById(`name-${id}`).value;
    const price=parseInt(document.getElementById(`price-${id}`).value);
    const image=document.getElementById(`image-${id}`).value;
    await supabase.from("products").update({name,price,image}).eq("id",id);
    alert("Produk berhasil diupdate");
}

async function deleteProduct(id){
    if(confirm("Hapus produk ini?")){
        await supabase.from("products").delete().eq("id",id);
        fetchProducts();
    }
}

fetchProducts();

// Realtime update semua user
supabase.from("products").on('*',payload=>{fetchProducts();}).subscribe();
