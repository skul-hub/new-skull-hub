<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kelola Pesanan - Admin StoreSkull</title>
<link rel="stylesheet" href="../style.css">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
<script src="../supabase.js"></script>
<script src="../js/admin/admin-orders.js"></script>
</head>
<body>

<div class="navbar">
    <div>StoreSkull Admin</div>
    <div>
        <a href="dashboard.html">Beranda</a>
        <a href="kelola-produk.html">Kelola Produk</a>
        <a href="kelola-pesanan.html">Kelola Pesanan</a>
        <a href="#" id="logoutBtn">Logout</a>
    </div>
</div>

<h2 style="text-align:center; margin-top:20px;">Kelola Pesanan</h2>

<h3>Pending</h3>
<div id="pendingTable"></div>

<h3>Done</h3>
<div id="doneTable"></div>

<h3>Batal</h3>
<div id="batalTable"></div>

<footer>@2025 SKULLHOSTING - StoreSkull</footer>

</body>
</html>
