const FactoryMethod = require('./patterns/FactoryMethod');
const ProxyMethod = require('./patterns/ProxyMethod');
const SingletonMethod = require('./patterns/SingletonMethod');

async function main() {
    // using the factory to create a product
    const book = ProductFactory.createProduct(
        "101", //id
        "English Flashcards for Kids",  //name
         6.00, //price
        "Learning English with fun flashcards!"); //description

    //proxy to process payment and log transactions:
    const paymentGate = new PaymentProxy();
    
    try {
        const result = await paymentGate.process({ name: "Student_User" }, book);
        console.log("Purchase Complete!!");
    } catch (err) {
        console.error("Purchase Error:", err.message);
    }
}

main();