let isAuthenticated = false;

// Admin-Login
async function adminLogin() {
    const password = document.getElementById('admin-password').value;

    const response = await fetch('https://restaurant-miniapp.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    if (response.ok) {
        isAuthenticated = true;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadOrders();
    } else {
        alert("❌ Falsches Passwort!");
    }
}

// Bestellungen laden
async function loadOrders() {
    const response = await fetch('https://restaurant-miniapp.onrender.com/api/orders');
    const orders = await response.json();

    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const div = document.createElement('div');
        div.className = 'order-card';
        div.innerHTML = `
            <strong>🧑 ${order.customerName}</strong><br>
            📦 ${order.products.join(', ')}<br>
            📍 ${order.address}<br>
            📱 ${order.phone}<br>
            Status: <b>${order.orderStatus}</b><br>
            <button onclick="updateOrderStatus('${order._id}')">✅ Geliefert</button>
            <button onclick="deleteOrder('${order._id}')">🗑️ Löschen</button>
            <hr>
        `;
        ordersList.appendChild(div);
    });
}

// Status ändern
async function updateOrderStatus(orderId) {
    const response = await fetch(`https://restaurant-miniapp.onrender.com/api/orders/${orderId}/order-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: 'Geliefert' })
    });

    if (response.ok) {
        alert("✅ Bestellung aktualisiert!");
        loadOrders();
    } else {
        alert("❌ Fehler beim Aktualisieren!");
    }
}

// Bestellung löschen
async function deleteOrder(orderId) {
    const confirmDelete = confirm("Willst du wirklich diese Bestellung löschen?");
    if (!confirmDelete) return;

    const response = await fetch(`https://restaurant-miniapp.onrender.com/api/orders/${orderId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert("✅ Bestellung gelöscht!");
        loadOrders();
    } else {
        alert("❌ Fehler beim Löschen!");
    }
}
