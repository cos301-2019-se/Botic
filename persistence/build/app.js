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
var cors = require('cors');
var index_1 = __importDefault(require("./routes/index"));
var bodyParser = require('body-parser');
// Set up the express app
var app = express();
app.use(cors());
// Parse incoming requests using body-parser
// app.use(bodyParser.json());
// Make "true" to fix possible deprecation warning
app.use(bodyParser.json({}));
app.use(index_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("server running on port " + PORT);
});
