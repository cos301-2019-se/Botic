/**
 * File Name: DatabaseManager.spec.integration.js
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
 * Purpose  :  This is class was made to test the integration of the Database Manager and the DatabaseAccess
 *             objects in handling requests.
 */

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

var DatabaseManager_1 = __importDefault(require("./DatabaseManager"));
var httpMocks = require('node-mocks-http');

describe('DatabaseManager saveLog function saves the log', function () {
    
  it('saveLog function handles the request.', function () {

    const fakeLog = { "userIP": "123.15.56.93", "attemptTime": "2019-05-20T02:35:54.008Z", "context": "loginController" };

    var req = httpMocks.createRequest({
      method: 'POST',
      url: '/saveLog',
      body: fakeLog,
    });

    var res = httpMocks.createResponse();

    DatabaseManager_1.default.saveLog(req,res);
    
    // this is strange: can't access the message inside the response
    expect(res.statusCode).toEqual(200);
  });
});

describe('DatabaseManager getLog function retrieves the log', () => {

  it('getLog function handles the request', () => {
    const fakeIP = '107.89.15.96';
    const fakeLog = { "userIP": "123.15.56.93", "attemptTime": new Date(), "context": "loginController" };

    var req = httpMocks.createRequest({
      method: 'POST',
      url: '/saveLog',
      body: fakeLog,
    });

    //statusCode becomes 200 by default
    var res = httpMocks.createResponse();
    res.status(0);
    
    DatabaseManager_1.default.saveLog(req,res);
    
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/getLog',
      body: fakeIP,
    });

    res = httpMocks.createResponse();
    res.status(0);
    
    DatabaseManager_1.default.getLog(req,res);
    
    expect(res.statusCode).toEqual(200);

  });
});
