const {MongoClient} = require('mongodb');

const config = require('./config'); // pulling  data from config.js

const client = new MongoClient(config.mongoURI);

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

        const showDB = await database.collection('inventory').findOne({});
        console.log("Found entry:", showDB);


        } catch (error) {
         console.error("Database connection failed:", error);
       } finally {
         await client.close();
  }
}
run()