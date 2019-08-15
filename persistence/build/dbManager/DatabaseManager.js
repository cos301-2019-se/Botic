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
var LogDBAccess_1 = require("../dbAccess/LogDBAccess");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
    }
    // tslint:disable-next-line: typedef
    DatabaseManager.prototype.saveLog = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, logDbAccess, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logDbAccess = new LogDBAccess_1.LogDBAccess();
                        console.log('things going well');
                        return [4 /*yield*/, logDbAccess.save(req.body)];
                    case 1:
                        result = _a.sent();
                        if (result === 'inserted') {
                            return [2 /*return*/, res.status(201).send({
                                    success: 'true',
                                    message: 'Log saved successfully.',
                                })];
                        }
                        else if (result === 'error') {
                            return [2 /*return*/, res.status(400).send({
                                    success: 'false',
                                    message: 'Database error.',
                                })];
                        }
                        console.log('You have got to be kidding me.');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).send({
                                success: 'false',
                                message: error_1,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line: typedef
    DatabaseManager.prototype.getLog = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var logDbAccess, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('DatabaseManager: inside getLog');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        logDbAccess = new LogDBAccess_1.LogDBAccess();
                        return [4 /*yield*/, logDbAccess.get(req.body)];
                    case 2:
                        result = _a.sent();
                        if (result === 'error') {
                            return [2 /*return*/, res.status(500).send({
                                    success: 'false',
                                    message: 'Database error.',
                                })];
                        }
                        else if (result === 'none') {
                            return [2 /*return*/, res.status(428).send({
                                    success: 'false',
                                    message: 'No recent login attempt from this IP.',
                                })];
                        }
                        else if (result) {
                            return [2 /*return*/, res.status(200).send({
                                    success: 'true',
                                    message: 'Retrieved log successfully',
                                    log: result,
                                })];
                        }
                        res.status(500).send({
                            success: 'false',
                            message: 'Something is up',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send({
                            success: 'false',
                            message: error_2,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DatabaseManager;
}());
var databaseManager = new DatabaseManager();
exports.default = databaseManager;
