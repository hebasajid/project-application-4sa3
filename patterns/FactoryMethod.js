const Product = require('../models/Product');

class FactoryMethod {
    static createProduct(id, name, price, description) {
        console.log(`[Factory] Creating product object for: ${name}`);
        return new Product(id, name, price, description);
    }
}

module.exports = FactoryMethod;