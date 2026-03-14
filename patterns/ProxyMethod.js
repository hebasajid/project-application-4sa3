//using Stripe as the payment gateway
const StripeService = require('../services/StripeService');
const db = require('../services/MongoService'); //singleton for MongoDB connection and logging transactions

class ProxyMethod {

    constructor() {
        this.realStripe = new StripeService();
        this.db = new MongoService();
    }

    async process(user, product) {
        // traceability: log start
        await db.logTransaction({
            user: user.name,
            productId: product.id,
            amount: product.price,
            status: "initiated"
        });
   
        console.log(`[Proxy] Traceability log created: ${log.logId}`);

    try {
            // forwarding to the  Stripe service
            const stripeResponse = await this.realStripe.charge(product.price);
            
            // log updates on success
            console.log(`[Proxy] Success Stripe ID: ${stripeResponse.id}`);
            return { success: true, stripeId: stripeResponse.id };

        } catch (error) {
            // log updates on failure
            console.log(`[Proxy] Payment failed. Log updated.`);
            throw error;
        }
    }
}

module.exports = ProxyMethod;