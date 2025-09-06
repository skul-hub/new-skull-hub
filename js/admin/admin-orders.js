document.addEventListener("DOMContentLoaded", async ()=>{
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("admin");
        window.location.href="../index.html";
    });

    const pendingDiv = document.getElementById("pendingTable");
    const doneDiv = document.getElementById("doneTable");
    const batalDiv = document.getElementById("batalTable");

    async function fetchOrders(){
        const { data: orders } = await supabase.from("orders").select("*").order('created_at',{ascending:true});
        if(!orders) return;

        const pending = orders.filter(o=>o.status==="pending");
        const done = orders.filter(o=>o.status==="done");
        const batal = orders.filter(o=>o.status==="batal");

        function renderTable(data, div){
            if(data.length===0){ div.innerHTML="<p>Tidak ada data</p>"; return; }
            let html=`<table class="table"><tr><th>Nama Barang</th><th>Qty</th><th>Subtotal</th><th>Pembeli</th><th>Status</th><th>Aksi</th></tr>`;
            data.forEach(o=>{
                html+=`<tr>
                    <td>${o.product_name}</td>
                    <td>${o.qty}</td>
                    <td>Rp${o.price*o.qty}</td>
                    <td>${o.buyer_name}</td>
                    <td>${o.status}</td>
                    <td>${o.status==="pending"?`<button onclick="updateStatus('${o.id}','done')">Done</button>
                        <button onclick="updateStatus('${o.id}','batal')">Batal</button>`:"-"}</td>
                </tr>`;
            });
            html+=`</table>`;
            div.innerHTML = html;
        }

        renderTable(pending,pendingDiv);
        renderTable(done,doneDiv);
        renderTable(batal,batalDiv);
    }

    window.updateStatus = async (id,status)=>{
        await supabase.from("orders").update({status}).eq("id",id);
        fetchOrders();
    }

    fetchOrders();

    // Real-time update
    supabase.from("orders").on('UPDATE', payload=>{
        fetchOrders();
    }).subscribe();
});
