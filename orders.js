const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Bestellungen abrufen
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Bestellung erstellen
router.post('/', async (req, res) => {
    try {
        const { products, address, totalAmount } = req.body;
        const order = new Order({ products, address, totalAmount });
        await order.save();

        // Fahrer-Bot informieren
        const { notifyRiderNewOrder } = require('../../rider-bot/bot');
        notifyRiderNewOrder(order);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Status aktualisieren (für Fahrer-Bot)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
