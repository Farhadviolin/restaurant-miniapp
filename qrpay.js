// Die URL oder dein Stripe Payment-Link
const paymentUrl = "https://pay.stripe.com/YOUR_PAYMENT_LINK"; // Deinen echten Link hier setzen

// QR-Code generieren
QRious(paymentUrl);

function QRious(url) {
    QRCode.toCanvas(document.getElementById('qrcode'), url, function (error) {
        if (error) console.error(error);
        console.log('✅ QR-Code erstellt!');
    });
}
