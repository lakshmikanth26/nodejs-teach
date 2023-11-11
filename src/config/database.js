const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL;
const DATABASE = process.env.DB_NAME;

async function connectToMongoDB(){
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            dbName:DATABASE
        })
    } catch(err) {
        console.log(err,"ERROR")
    }
}

// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file

// const url = process.env.MONGODB_URL;
// const dbName = process.env.DB_NAME;

// async function connectToMongoDB() {
//     try {
//         await mongoose.connect(url, {
//             dbName,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to the database');

//         // Define your schemas and models here

//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//     }
// }

module.exports = { connectToMongoDB };