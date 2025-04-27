// Direkt beim Laden
window.onload = async () => {
    await loadProfile();
};

// Profil laden
async function loadProfile() {
    try {
        const response = await fetch('https://restaurant-miniapp.onrender.com/api/customers/me', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        document.getElementById('profile-name').innerText = "Name: " + data.name;
        document.getElementById('profile-email').innerText = "Email: " + data.email;
        document.getElementById('profile-points').innerText = "Treuepunkte: " + data.loyaltyPoints + " 🏆";

    } catch (err) {
        console.error('❌ Fehler beim Laden des Profils:', err);
    }
}

// Ausloggen
function logout() {
    alert('🚪 Erfolgreich ausgeloggt!');
    window.location.href = 'login.html';
}
