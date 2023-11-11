const express = require('express');
const app = require('./config/express');
const { connectToMongoDB } = require('./config/database');
app.use(express.json());


connectToMongoDB().then(()=>{
      console.log("Connected to mongodb")
  }).catch((err)=>{
      console.error(err);
  });
  
// connectToMongoDB()
//   .then(() => {
//     // Set up your routes and other middleware here
//     app.use(express.json());
//     app.get('/', (req, res) => {
//         res.send('Welcome to the server!');
//     });
//   })
//   .catch((err) => {
//     // Connection error
//     console.error('Error connecting to the database:', err);
//     console.log('Failed to start the server due to database connection issue');
//   });

module.exports = app;