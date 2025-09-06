document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if(username==="admin" && password==="admin112233"){
            localStorage.setItem("admin","true");
            alert("Berhasil login sebagai Admin!");
            window.location.href="admin/dashboard.html";
            return;
        }

        const { data: users } = await supabase.from("users").select("*").eq("username",username).eq("password",password);
        if(users.length===0) return alert("Username / Password salah");

        localStorage.setItem("userId", users[0].id);
        alert("Berhasil login!");
        window.location.href="user/dashboard.html";
    });
});
