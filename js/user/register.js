document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const msg = document.getElementById("msg");

    registerForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // cek username sudah ada
        const { data: existing } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .single();

        if(existing){
            msg.textContent = "Username sudah digunakan!";
        } else {
            const { data, error } = await supabase
                .from("users")
                .insert([{ username, password }]);
            if(error){
                msg.textContent = "Gagal registrasi!";
            } else {
                alert("Berhasil registrasi! Silakan login.");
                window.location.href = "index.html";
            }
        }
    });
});
