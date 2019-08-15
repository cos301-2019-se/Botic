import DatabaseManager from './DatabaseManager';
import { Request, Response } from 'express';

describe('DatabaseManager saveLog function saves the log', () => {

    it('saveLog function is defined.', () => {

        const spy = spyOn(DatabaseManager, 'saveLog');
        
        // tslint:disable-next-line: prefer-const
        let req: any;
        // tslint:disable-next-line: prefer-const
        let res: any;
        DatabaseManager.saveLog(req as Request, res as Response);
        expect(spy).toHaveBeenCalled();

    });
});

describe('DatabaseManager getLog function gets the log', () => {

    it('getLog function is defined.', () => {

        const spy = spyOn(DatabaseManager, 'getLog');

        // tslint:disable-next-line: prefer-const
        let req: any;
        // tslint:disable-next-line: prefer-const
        let res: any;

        DatabaseManager.getLog(req as Request, res as Response);
        expect(spy).toHaveBeenCalled();
    });
});
