/**
 * File Name: app.js
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers: 
 * 
 */

/**
 * Purpose  :  This is the Database Manager API.
 */

var express = require('express');
import router from './routes/index';

var bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Parse incoming requests using body-parser
app.use(bodyParser.json());
// Make "true" to fix possible deprecation warning
app.use(bodyParser.urlencoded({ extended: false}));
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});