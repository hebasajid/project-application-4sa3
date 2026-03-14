const config = require('../config');

const stripe = require('stripe')(config.stripeSecretKey); //initializing Stripe with the secret key from config

class StripeService {

    async charge(amount, productName) { //method to charge a payment
        console.log(`[Stripe API] Connecting to Stripe to process: ${productName}...`);
    
        try {
            // API call - sendign data to stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), //converting dollars to cents for stripe
                currency: 'usd',
                payment_method: 'pm_card_visa', // test card by stripe
                confirm: true,
                description: `M3 Submission Test: ${productName}`,
                // allows  to run this in CLI without a browser
                automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
            });
   
            //api response: success or failure
            console.log(`[Stripe API] Response received! ID: ${paymentIntent.id}`);
            return paymentIntent;

            } catch (error) {
            console.error("[Stripe API] Connection Error:", error.message);
            throw error;
        }
    }
}

module.exports = StripeService;