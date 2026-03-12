//using Stripe as the payment gateway
class ProxyMethod {

    constructor() {
        this.realStripe = new StripeService();
        this.db = new MongoService();
    }

   
}

module.exports = PaymentProxy;