// server/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Benutzer registrieren
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-Mail bereits registriert" });
        }

        const newUser = new User({ name, email, password, address });
        await newUser.save();

        res.status(201).json({ message: "Benutzer erfolgreich registriert" });
    } catch (err) {
        res.status(500).json({ message: "Serverfehler", error: err.message });
    }
});

module.exports = router;
