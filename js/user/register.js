document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if(!username || !password) return alert("Semua field wajib diisi");

        // cek username unik
        const { data: existing } = await supabase.from("users").select("*").eq("username", username);
        if(existing.length>0) return alert("Username sudah ada");

        const { error } = await supabase.from("users").insert([{username, password}]);
        if(error) return alert(error.message);

        alert("Registrasi berhasil! Silahkan login");
        window.location.href = "index.html";
    });
});
