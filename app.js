const FactoryMethod = require('./patterns/FactoryMethod');
const ProxyMethod = require('./patterns/ProxyMethod');

async function main() {
    
// using the factory to create a product -hardcoded for testing purposes

try{
    const book = FactoryMethod.createProduct(
        "105", //id
        "Spanish Textbooks",  //name
         65.00, //price
        "Spanish Textbook for Beginners!",); //description
        

    //proxy to process payment and log transactions:
    const paymentGate = new ProxyMethod();

    console.log("Processing payment for:", book.name);

    const result = await paymentGate.process({ name: "Student" }, book); //users info and prod. details passed to  proxy for processing
        
        console.log("--- Purchase Complete!! ---");
        console.log("Product:", book.name);
        console.log("Description:", book.description);
        console.log("Amount Charged: $", book.price);
        console.log("Stripe Transaction ID:", result.id);
    
    } catch (err) {
        console.error("--- Purchase Error ---");
        console.error("Message:", err.message);
    }

}

main();