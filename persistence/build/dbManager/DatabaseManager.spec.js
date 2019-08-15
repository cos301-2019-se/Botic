"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseManager_1 = __importDefault(require("./DatabaseManager"));
describe('DatabaseManager saveLog function saves the log', function () {
    it('saveLog function is defined.', function () {
        var spy = spyOn(DatabaseManager_1.default, 'saveLog');
        // tslint:disable-next-line: prefer-const
        var req;
        // tslint:disable-next-line: prefer-const
        var res;
        DatabaseManager_1.default.saveLog(req, res);
        expect(spy).toHaveBeenCalled();
    });
});
describe('DatabaseManager getLog function gets the log', function () {
    it('getLog function is defined.', function () {
        var spy = spyOn(DatabaseManager_1.default, 'getLog');
        // tslint:disable-next-line: prefer-const
        var req;
        // tslint:disable-next-line: prefer-const
        var res;
        DatabaseManager_1.default.getLog(req, res);
        expect(spy).toHaveBeenCalled();
    });
});
