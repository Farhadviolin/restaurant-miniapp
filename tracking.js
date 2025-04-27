let trackingInterval = null;

function startTracking() {
    const orderId = document.getElementById('orderIdInput').value.trim();

    if (!orderId) {
        return alert('Bitte eine Bestell-ID eingeben!');
    }

    if (trackingInterval) {
        clearInterval(trackingInterval);
    }

    trackingInterval = setInterval(async () => {
        const response = await fetch(`https://restaurant-miniapp.onrender.com/api/orders/${orderId}`);
        
        if (response.ok) {
            const order = await response.json();
            document.getElementById('order-status').textContent = `📦 ${order.orderStatus}`;
        } else {
            document.getElementById('order-status').textContent = '❌ Bestellung nicht gefunden!';
            clearInterval(trackingInterval);
        }
    }, 5000); // Alle 5 Sekunden aktualisieren
}
