async function fetchOrders(){
    const {data:orders}=await supabase.from("orders").select("*").order("created_at",{ascending:false});
    const pending=document.getElementById("pendingTable");
    const done=document.getElementById("doneTable");
    const cancel=document.getElementById("cancelTable");

    pending.innerHTML=done.innerHTML=cancel.innerHTML="";

    orders.forEach(o=>{
        const row=`<tr>
            <td>${o.product_name}</td>
            <td>${o.qty}</td>
            <td>Rp${o.price*o.qty}</td>
            <td>${o.buyer_name}</td>
            <td>${o.phone}</td>
            <td>${o.telegram||"-"}</td>
            <td>${o.status}</td>
            <td>${o.status==="pending"?`<button onclick="updateStatus('${o.id}','done')">Done</button><button onclick="updateStatus('${o.id}','batal')">Batal</button>`:"-"}</td>
        </tr>`;
        if(o.status==="pending") pending.innerHTML+=row;
        else if(o.status==="done") done.innerHTML+=row;
        else if(o.status==="batal") cancel.innerHTML+=row;
    });
}

async function updateStatus(id,status){
    await supabase.from("orders").update({status}).eq("id",id);
    alert("Status diperbarui");
}

fetchOrders();
supabase.from("orders").on('*',payload=>{fetchOrders();}).subscribe();
