"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogDBAccess_1 = require("./LogDBAccess");
describe('LogDBAccess save function saves a log into the database', function () {
    it('save function is defined', function () {
        var logDBAccess = new LogDBAccess_1.LogDBAccess();
        var spy = spyOn(logDBAccess, 'save');
        // this example is a full login log: comes in pieces
        var fakeLog = ' { "attemptTime": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';
        // { "successTime": "2019-05-20T02:37:54.008Z", "userId":"google-oath2|5484181818181818" }';
        logDBAccess.save(fakeLog);
        expect(spy).toHaveBeenCalledWith(fakeLog);
    });
});
describe('LogDBAccess get function gets log from the database', function () {
    it('get function is define', function () {
        var logDBAccess = new LogDBAccess_1.LogDBAccess();
        var spy = spyOn(logDBAccess, 'get');
        var fakeIP = '107.5.23.69';
        logDBAccess.get(fakeIP);
        expect(spy).toHaveBeenCalled();
    });
});
