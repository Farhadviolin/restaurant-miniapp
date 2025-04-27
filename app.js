let cart = [];

async function loadProducts() {
    const response = await fetch('https://restaurant-miniapp.onrender.com/api/products');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="https://restaurant-miniapp.onrender.com/uploads/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} €</p>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">In den Warenkorb</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `${item.name} - ${item.price} € <button onclick="removeFromCart(${index})">❌</button>`;
        cartDiv.appendChild(div);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

async function placeOrder() {
    const address = document.getElementById('address').value;
    if (!address || cart.length === 0) {
        alert("Bitte Adresse eingeben und mindestens 1 Produkt auswählen!");
        return;
    }

    const response = await fetch('https://restaurant-miniapp.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            address,
            products: cart.map(item => ({ productId: item.id, name: item.name, price: item.price })),
            totalAmount: cart.reduce((sum, item) => sum + item.price, 0)
        })
    });

    if (response.ok) {
        alert('✅ Bestellung erfolgreich abgeschickt!');
        cart = [];
        updateCart();
    } else {
        alert('❌ Fehler beim Bestellen.');
    }
}

loadProducts();
