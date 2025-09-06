document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("admin");
        window.location.href = "../index.html";
    });

    // Optional: cek login admin
    if(!localStorage.getItem("admin") && window.location.pathname.includes("admin")){
        const username = prompt("Masukkan username admin:");
        const password = prompt("Masukkan password admin:");
        if(username === "admin" && password === "admin112233"){
            alert("Berhasil login sebagai admin!");
            localStorage.setItem("admin","true");
        } else {
            alert("Gagal login admin!");
            window.location.href="../index.html";
        }
    }
});
