"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Purpose  :  This is will be used to handle our routes so that we can use router middleware for our API.
 */
var express_1 = require("express");
var DatabaseManager_1 = __importDefault(require("../dbManager/DatabaseManager"));
var checkToken_1 = require("../middleware/checkToken");
var router = express_1.Router();
// get all todos: example
router.get('/api/v1/todos', DatabaseManager_1.default.getAllTodos);
// create a todo: example
router.post('/api/v1/todos', DatabaseManager_1.default.createTodo);
// saveLog endpoint
router.post('/saveLog', [checkToken_1.checkToken], DatabaseManager_1.default.saveLog);
// getLog endpoint
router.get('/getLog', DatabaseManager_1.default.getLog);
// here we include the full log in JSON format as retrieved from the database.
exports.default = router;
