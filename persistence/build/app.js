"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Purpose  :  This is the Database Manager API.
 */
var express = require('express');
var DatabaseAccess_1 = __importDefault(require("./dbAccess/DatabaseAccess"));
// Set up the express app
var app = express();
// get all todos
app.get('/api/v1/todos', function (req, res) {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: DatabaseAccess_1.default
    });
});
// saveLog endpoint
app.post('/saveLog', function (req, res) {
    res.status(200).send({
        success: 'true',
        message: 'log saved successfully'
    });
});
// getLog endpoint
app.get('/getLog', function (req, res) {
    res.status(200).send({
        success: 'true',
        message: 'log retrieved successfully'
    });
});
// here we include the full log in JSON format as retrieved from the database.
var PORT = 5000;
app.listen(PORT, function () {
    console.log("server running on port " + PORT);
});
