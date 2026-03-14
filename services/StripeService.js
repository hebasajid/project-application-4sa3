const config = require('../config/config');

const stripe = require('stripe')(config.stripeSecretKey); //initializing Stripe with the secret key from config

class StripeService {

    async charge(amount, productName) { //method to charge a payment
        console.log(`[Stripe API] Connecting to Stripe to process: ${productName}...`);
    
   
}

module.exports = StripeService;