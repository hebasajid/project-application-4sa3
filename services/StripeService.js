const config = require('../config/config');

const stripe = require('stripe')(config.stripeSecretKey); //initializing Stripe with the secret key from config

class StripeService {

   
}

module.exports = StripeService;