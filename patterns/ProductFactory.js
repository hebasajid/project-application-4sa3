const Product = require('../models/Product');

class ProductFactory {
    static createProduct(id, name, price, description) {
        console.log(`[Factory] Creating product object for: ${name}`);
        return new Product(id, name, price, description);
    }
}

module.exports = ProductFactory;