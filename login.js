document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const response = await fetch('https://restaurant-miniapp.onrender.com/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('✅ Erfolgreich eingeloggt!');
        window.location.href = 'index.html';
    } else {
        alert('❌ Login fehlgeschlagen!');
    }
});
