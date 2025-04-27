const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Registrierung
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newCustomer = new Customer({ name, email, password });
        await newCustomer.save();
        res.status(201).json({ message: '✅ Kunde registriert!' });
    } catch (err) {
        res.status(500).json({ message: "❌ Fehler bei Registrierung", error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email, password });
        if (!customer) {
            return res.status(401).json({ message: "❌ Falsche Daten" });
        }
        res.json({ message: '✅ Login erfolgreich!' });
    } catch (err) {
        res.status(500).json({ message: "❌ Serverfehler", error: err.message });
    }
});

module.exports = router;
