const FactoryMethod = require('./patterns/FactoryMethod');
const ProxyMethod = require('./patterns/ProxyMethod');

async function main() {
    
// using the factory to create a product

try{
    const book = ProductFactory.createProduct(
        "101", //id
        "English Flashcards for Kids",  //name
         6.00, //price
        "Learning English with fun flashcards!"); //description

    //proxy to process payment and log transactions:
    const paymentGate = new PaymentProxy();

    console.log("Processing payment for:", book.name);

    const result = await paymentGate.process({ name: "Student_User" }, book);
        
        console.log("--- Purchase Complete!! ---");
        console.log("Stripe Transaction ID:", result.stripeId);
    
    } catch (err) {
        console.error("--- Purchase Error ---");
        console.error("Message:", err.message);
    }

}

main();