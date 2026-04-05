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
            await db.logTransaction({
                user: user.name,
                productId: product.id, //even if product name chanes, we can still track it by id in the logs
                amount: product.price,
                status: "initiated"
            });

            console.log(`[Proxy] Traceability log created.`);

        // calling the real stripe service to process the payment
        const stripeResponse = await this.realStripe.charge(product.price, product.name);

        //logging the successful transaction in the database
        console.log(`[Proxy] Success! Stripe Transaction ID: ${stripeResponse.id}`);
        return stripeResponse;
       
        } catch (error) {
            console.log(`[Proxy] Payment failed. Error recorded.`);
            throw error;
        }
    }
}

module.exports = ProxyMethod;