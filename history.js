window.onload = async () => {
    await loadOrderHistory();
};

async function loadOrderHistory() {
    try {
        const response = await fetch('https://restaurant-miniapp.onrender.com/api/customers/myorders');
        const orders = await response.json();

        const orderHistory = document.getElementById('order-history');
        orderHistory.innerHTML = '';

        if (orders.length === 0) {
            orderHistory.innerHTML = "<p>😔 Keine Bestellungen gefunden.</p>";
            return;
        }

        orders.forEach(order => {
            const div = document.createElement('div');
            div.className = 'order-card';
            div.innerHTML = `
                <h3>Bestellung vom ${new Date(order.createdAt).toLocaleDateString()}</h3>
                <p><strong>Gesamtbetrag:</strong> ${order.totalAmount.toFixed(2)} €</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <hr>
            `;
            orderHistory.appendChild(div);
        });
    } catch (err) {
        console.error('❌ Fehler beim Laden der Bestellhistorie:', err);
    }
}
