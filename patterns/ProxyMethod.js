//using Stripe as the payment gateway
const StripeService = require('../services/StripeService');
const MongoService = require('../services/MongoService');

class ProxyMethod {

    constructor() {
        this.realStripe = new StripeService();
        this.db = new MongoService();
    }

   
}

module.exports = PaymentProxy;