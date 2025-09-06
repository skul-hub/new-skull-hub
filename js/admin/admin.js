document.addEventListener("DOMContentLoaded", ()=>{
    if(!localStorage.getItem("admin")){window.location.href="../index.html";}
    const navbar=document.querySelector(".navbar");
    navbar.innerHTML=`
        <a href="dashboard.html">Dashboard</a>
        <a href="kelola-produk.html">Kelola Produk</a>
        <a href="kelola-pesanan.html">Kelola Pesanan</a>
        <a href="#" id="logoutBtn">Logout</a>
    `;
    document.getElementById("logoutBtn").onclick=()=>{localStorage.removeItem("admin"); window.location.href="../index.html";}
});
