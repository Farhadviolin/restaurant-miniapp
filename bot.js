const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

// Bot initialisieren
const bot = new TelegramBot(process.env.RIDER_BOT_TOKEN, { polling: true });

// Fahrer-Chat-IDs speichern
const riderChatIds = new Set();

// /start Befehl
bot.onText(/\/start/, (msg) => {
    riderChatIds.add(msg.chat.id);
    bot.sendMessage(msg.chat.id, "👋 Willkommen Fahrer!\nDu bekommst neue Bestellungen und kannst Live-Status senden.");
});

// Neue Bestellung an alle Fahrer senden
function notifyRiderNewOrder(order) {
    riderChatIds.forEach((chatId) => {
        const text = `📦 Neue Bestellung!\nAdresse: ${order.address}\nSumme: ${order.totalAmount} €`;
        bot.sendMessage(chatId, text);
    });
}

// Fahrer sendet Standort
bot.on('location', (msg) => {
    console.log(`📍 Fahrer-Position erhalten: ${msg.location.latitude}, ${msg.location.longitude}`);
    // Hier könnte man die Koordinaten speichern oder an Kunden schicken
});

// Fahrer aktualisiert Bestellstatus
bot.onText(/\/status (.+)/, async (msg, match) => {
    const [orderId, ...statusParts] = match[1].split(' ');
    const status = statusParts.join(' ');

    try {
        await axios.put(`https://restaurant-miniapp.onrender.com/api/orders/${orderId}/status`, { status });
        bot.sendMessage(msg.chat.id, "✅ Status erfolgreich aktualisiert!");
    } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, "❌ Fehler beim Status-Update!");
    }
});

module.exports = { notifyRiderNewOrder };
