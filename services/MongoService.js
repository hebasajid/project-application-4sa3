const mongoose = require('mongoose');
const config = require('../config'); // pulling data from config.js

class MongoService {
    constructor() {
        this.connectionString = config.mongoURI; 
    }
