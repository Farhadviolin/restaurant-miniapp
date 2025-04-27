const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayOrders = await Order.find({ createdAt: { $gte: today } });
        const allOrders = await Order.find();

        const todaySales = todayOrders.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalSales = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({
            todaySales,
            todayOrders: todayOrders.length,
            totalSales,
            activeDrivers: 3 // Später dynamisch: Fahrer-Status verwalten
        });
    } catch (err) {
        res.status(500).json({ message: "Serverfehler", error: err.message });
    }
});

module.exports = router;
