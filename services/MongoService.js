const mongoose = require('mongoose');
const config = require('../config'); // pulling data from config.js

class MongoService {
    constructor() {
        if (MongoService.instance) { //checking if instance already exists for database connection
            return MongoService.instance; //singleton pattern to ensure only one connection instance is created
        }

        this.client = new MongoClient(config.mongoURI);
        this.db = null;
        this._connect();
        
        MongoService.instance = this;
    }

    async _connect() { //establishing connection to MongoDB
        try {
            await this.client.connect(config.mongoURI);
            this.db = this.client.db('education_cloud');
            console.log("MongoDB Connected Successfully.");
            
        } catch (err) {
            console.error("Database Connection Error:", err.message);
        }
    }
    
    async logTransaction(data) {
        console.log(`[MongoDB] Logging trace for Product: ${data.productId}`);
       try {
            if (!this.db) {
                // If called before connection is ready, we use the client directly
                const tempDb = this.client.db('education_cloud');
                await tempDb.collection('logs').insertOne({ ...data, timestamp: new Date() });
            } else {
                await this.db.collection('logs').insertOne({ ...data, timestamp: new Date() });
            }
            console.log("[MongoDB] Transaction saved to 'logs' collection.");
        } catch (error) {
            console.error("[MongoDB] Error saving to database:", error.message);
        }
    }
}

const instance = new MongoService(); //creating a single instance of MongoService to be used across the application
module.exports = instance;