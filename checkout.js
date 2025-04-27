const stripe = Stripe('DEIN_STRIPE_PUBLIC_KEY'); // Kommt noch in .env!

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        paymentMessage.textContent = error.message;
        paymentMessage.classList.remove('hidden');
    } else {
        paymentMessage.textContent = "✅ Zahlung erfolgreich!";
        paymentMessage.classList.remove('hidden');
    }
});
