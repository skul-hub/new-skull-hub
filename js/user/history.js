const uid=localStorage.getItem("userId");

async function fetchHistory(){
    const {data:orders}=await supabase.from("orders").select("*").eq("user_id",uid).order("created_at",{ascending:false});
    const container=document.getElementById("historyContainer");
    if(!orders || orders.length===0){container.innerHTML="<p>Belum ada history</p>"; return;}
    let html=`<table class="table"><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Status</th></tr>`;
    orders.forEach(o=>{
        html+=`<tr>
            <td>${o.product_name}</td>
            <td>${o.qty}</td>
            <td>Rp${o.price*o.qty}</td>
            <td>${o.status}</td>
        </tr>`;
    });
    html+="</table>";
    container.innerHTML=html;
}

fetchHistory();
supabase.from(`orders:user_id=eq.${uid}`).on('*',payload=>{fetchHistory();}).subscribe();
