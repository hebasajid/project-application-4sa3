const mongoose = require('mongoose');
const config = require('../config'); // pulling data from config.js

class MongoService {
    constructor() {
        if (MongoService.instance) { //checking if instance already exists for database connection
            return MongoService.instance; //singleton pattern to ensure only one connection instance is created
        }

        this._connect();
        MongoService.instance = this; // saving the instance
    }

    async _connect() { //establishing connection to MongoDB
        try {
            await mongoose.connect(config.mongoURI);
            console.log("MongoDB Connected Successfully.");
        } catch (err) {
            console.error("Database Connection Error:", err.message);
        }
    }
    
    async logTransaction(data) {
        console.log(`[MongoDB] Logging trace for Product: ${data.productId}`);
        return { id: "log_" + Date.now(), ...data }; 
    }
}

const instance = new MongoService(); //creating a single instance of MongoService to be used across the application
module.exports = instance;