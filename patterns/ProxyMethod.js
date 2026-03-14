//using Stripe as the payment gateway
const StripeService = require('../services/StripeService');
const db = require('../services/MongoService'); //singleton for MongoDB connection and logging transactions

class ProxyMethod {

    constructor() {
        this.realStripe = new StripeService();
    }

    async process(user, product) {
        // creating a traceability log before calling  stripe service

        try {
            //tracebaility log entry before calling the real service
            const logEntry = await db.logTransaction({
                user: user.name,
                productId: product.id,
                amount: product.price,
                status: "initiated"
            });

            console.log(`[Proxy] Traceability log created.`);
       
}

module.exports = ProxyMethod;