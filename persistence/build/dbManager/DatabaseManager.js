"use strict";
/**
 * File Name: DatabaseManager.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Purpose  :  This is class was made to handle all database queries. It was introduced to decouple all use
 *             case controllers from the databases and their respective implementations.
 */
var DatabaseAccess_1 = require("../dbAccess/DatabaseAccess");
var LogDBAccess_1 = require("../dbAccess/LogDBAccess");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
        this.logDbAccess = new LogDBAccess_1.LogDBAccess();
    }
    // wondering why this function is not 'async'? Me too.
    DatabaseManager.prototype.saveLog = function (req, res) {
        // this.logDbAccess.save();
    };
    DatabaseManager.prototype.getLog = function (req, res) {
        this.logDbAccess.get();
    };
    // example
    DatabaseManager.prototype.getAllTodos = function (req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: DatabaseAccess_1.DatabaseAccess,
        });
    };
    // example
    DatabaseManager.prototype.createTodo = function (req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required',
            });
        }
        else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required',
            });
        }
        var todo = {
            id: DatabaseAccess_1.DatabaseAccess.length + 1,
            title: req.body.title,
            description: req.body.description,
        };
        //DatabaseAccess.push(todo);
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            todo: todo,
        });
    };
    return DatabaseManager;
}());
var databaseManager = new DatabaseManager();
exports.default = databaseManager;
