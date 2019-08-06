/**
 * File Name: index.js
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
 * Purpose  :  This is will be used to handle our routes so that we can use router middleware for our API.
 */

var express = require('express');

import DatabaseManager from '../dbManager/DatabaseManager';

const router = express.Router();

// get all todos: example
router.get('/api/v1/todos', DatabaseManager.getAllTodos);

// create a todo: example
router.post('/api/v1/todos', DatabaseManager.createTodo);

// saveLog endpoint
router.post('/saveLog', DatabaseManager.saveLog);

// getLog endpoint
router.get('/getLog', DatabaseManager.getLog);
// here we include the full log in JSON format as retrieved from the database.

export default router;