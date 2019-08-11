"use strict";
/**
 * File Name: LogDBAccess.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Purpose  :  This is class was made to implement database operations for the storage and retrieval of logs.
 *             This implementation will be using MongoDB.
 */
var DatabaseAccess_1 = require("./DatabaseAccess");
var mongodb_1 = require("mongodb");
var LogDBAccess = /** @class */ (function (_super) {
    __extends(LogDBAccess, _super);
    function LogDBAccess() {
        var _this = _super.call(this) || this;
        _this.connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
        return _this;
    }
    LogDBAccess.prototype.connect = function () {
        this.connectDB();
    };
    // tslint:disable-next-line: typedef
    LogDBAccess.prototype.connectDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(this.connectionString, { useNewUrlParser: true })];
                    case 1:
                        _a.client = _b.sent();
                        console.log('Connected to database.');
                        if (this.client) {
                            this.db = this.client.db('logs');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log('Unable to connect to database.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LogDBAccess.prototype.disconnect = function () {
        // not necessary, apparently
    };
    LogDBAccess.prototype.save = function (log) {
        this.connectDB();
        this.saveMongo(log);
    };
    // tslint:disable-next-line: typedef
    LogDBAccess.prototype.saveMongo = function (log) {
        return __awaiter(this, void 0, void 0, function () {
            var logObject, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logObject = JSON.parse(JSON.stringify(log));
                        this.connect();
                        return [4 /*yield*/, this.db.collection('loginlogs').insertOne({
                                userIP: logObject.userIP, attemptTime: logObject.attemptTime, context: logObject.context,
                            })];
                    case 1:
                        results = _a.sent();
                        console.log(results.insertedId);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error connecting to database.');
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LogDBAccess.prototype.delete = function () {
    };
    LogDBAccess.prototype.update = function () {
    };
    LogDBAccess.prototype.get = function () {
    };
    return LogDBAccess;
}(DatabaseAccess_1.DatabaseAccess));
exports.LogDBAccess = LogDBAccess;
