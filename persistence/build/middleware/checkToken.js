"use strict";
/**
 * File Name: checkToken.js
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
// jst secret key; can be changed to arbitrary value
var jwtSecret = 'D!MN';
exports.checkToken = function (req, res, next) {
    // obtain token from header
    var token = req.headers['auth'];
    var jwtPayload;
    // attempt token validation and obtain data
    try {
        // because this is a middleware function
        jwtPayload = jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // respond with 401 (unauthorized error code)
        res.status(401).send();
        return;
    }
    // respond with a new token that has a new expiry
    var subsystem = jwtPayload.subsystem, component = jwtPayload.component;
    var newToken = jwt.sign({ subsystem: subsystem, component: component }, jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);
    // pass controll to the Database Manager
    next();
};
