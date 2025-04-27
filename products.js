const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const path = require('path');
const router = express.Router();

// Multer-Konfiguration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Produkte abrufen
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Produkt erstellen
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            image: req.file.filename,
            category
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Produkt löschen
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Produkt gelöscht" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Produkt aktualisieren
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };
        if (req.file) {
            updates.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
