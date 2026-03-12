const mongoose = require('mongoose');
const config = require('../config'); // pulling data from config.js

class MongoService {
    constructor() {
        this.connectionString = config.mongoURI; 
    }

async logTransaction(data) {
        console.log(`[MongoDB] Logging transaction for product ${data.productId}...`);
        return { logId: "LOG_" + Math.random().toString(36).substr(2, 9), ...data };
    }
}

module.exports = MongoService;