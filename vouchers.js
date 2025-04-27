window.onload = async () => {
    try {
        const response = await fetch('https://restaurant-miniapp.onrender.com/api/customers/vouchers');
        const vouchers = await response.json();

        const vouchersList = document.getElementById('vouchers-list');
        vouchersList.innerHTML = '';

        if (vouchers.length === 0) {
            vouchersList.innerHTML = "<p>😔 Keine Gutscheine verfügbar.</p>";
            return;
        }

        vouchers.forEach(customer => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <h3>${customer.name}</h3>
                <p>Email: ${customer.email}</p>
                <p>Gutscheine: ${customer.vouchers} €</p>
            `;
            vouchersList.appendChild(div);
        });
    } catch (err) {
        console.error('❌ Fehler beim Laden der Gutscheine:', err);
    }
};
