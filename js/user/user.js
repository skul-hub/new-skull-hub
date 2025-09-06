document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    if(loginForm){
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // cek admin hardcode
            if(username === "admin" && password === "admin112233"){
                alert("Berhasil login sebagai Admin!");
                window.location.href = "admin/dashboard.html";
                return;
            }

            // cek user di Supabase
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("username", username)
                .single();

            if(error){
                errorMsg.textContent = "User tidak ditemukan!";
            } else {
                if(data.password === password){
                    alert("Berhasil login!");
                    localStorage.setItem("user", JSON.stringify(data));
                    window.location.href = "user/dashboard.html";
                } else {
                    errorMsg.textContent = "Password salah!";
                }
            }
        });
    }
});
