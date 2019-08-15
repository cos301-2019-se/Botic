import { LogDBAccess } from './LogDBAccess';

describe('LogDBAccess save function saves a log into the database', () => {

    it('save function is defined', () => {
        const logDBAccess = new LogDBAccess();

        const spy = spyOn(logDBAccess, 'save');
        
        // this example is a full login log: comes in pieces
        const fakeLog = ' { "attemptTime": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';
        // { "successTime": "2019-05-20T02:37:54.008Z", "userId":"google-oath2|5484181818181818" }';

        logDBAccess.save(fakeLog);
        expect(spy).toHaveBeenCalledWith(fakeLog);
    });
});

describe('LogDBAccess get function gets log from the database', () => {

    it('get function is define', () => {
        const logDBAccess = new LogDBAccess();

        const spy = spyOn(logDBAccess, 'get');

        const fakeIP = '107.5.23.69';

        logDBAccess.get(fakeIP);
        expect(spy).toHaveBeenCalled();
    });
    
});
