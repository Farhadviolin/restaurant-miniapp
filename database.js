const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB verbunden');
    } catch (error) {
        console.error('❌ MongoDB Fehler:', error);
    }
}

module.exports = connectDB;
