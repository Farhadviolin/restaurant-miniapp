document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    const response = await fetch('https://restaurant-miniapp.onrender.com/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert('✅ Registrierung erfolgreich!');
        window.location.href = 'login.html';
    } else {
        alert('❌ Registrierung fehlgeschlagen!');
    }
});
