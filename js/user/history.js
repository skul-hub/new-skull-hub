document.addEventListener("DOMContentLoaded", async ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){ window.location.href="../index.html"; return; }

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("user");
        window.location.href="../index.html";
    });

    const container = document.getElementById("historyContainer");

    async function fetchHistory(){
        const { data: orders } = await supabase.from("orders").select("*").eq("user_id", user.id);
        if(!orders || orders.length===0){ container.innerHTML="<p>Tidak ada transaksi</p>"; return; }

        let html = `<table class="table">
            <tr><th>Nama Barang</th><th>Qty</th><th>Subtotal</th><th>Status</th></tr>`;
        orders.forEach(o=>{
            html += `<tr>
                <td>${o.product_name}</td>
                <td>${o.qty}</td>
                <td>Rp${o.price*o.qty}</td>
                <td>${o.status}</td>
            </tr>`;
        });
        html += `</table>`;
        container.innerHTML = html;
    }

    fetchHistory();

    // Real-time update
    supabase.from(`orders:user_id=eq.${user.id}`).on('UPDATE', payload=>{
        fetchHistory();
    }).subscribe();
});
