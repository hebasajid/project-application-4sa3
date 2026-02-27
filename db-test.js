const {MongoClient} = require('mongodb');

const uri =  "mongodb+srv://hsajid35467:educationcloud@cluster0.pabkhte.mongodb.net/ 
const client= new MongoClient(uri);

async function run() { 
    try {
        await client.connect();
        console.log('Connected to the Education Cloud Database!');
        const database = client.db('education_cloud');
        const inventory = database.collection('inventory');

        //testing - inserting a sample resource:
        const doc = {
            name: 'Alphabet Flashcards for Kids',
            type: 'Digital PDF',
            price: 6.00
        };
        const result = await inventory.insertOne(doc);
        console.log(`Successfully added test product with ID: ${result.insertedId}`);

        } catch (error) {
         console.error("Database connection failed:", error);
       } finally {
         await client.close();
  }
}
run()