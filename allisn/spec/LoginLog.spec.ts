import { LoginLog } from '../src/app/shared/Logs/LoginLog';

describe('LoginLog is constructed correctly and attributes are set correctly.', () => {
    
    it('The constructor should be defined.', () => {

        const fakeIP = '102.250.6.57';
        const fakeLoginAttempt = ' { "timestamp": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';
        
        expect(new LoginLog(fakeIP, fakeLoginAttempt)).toBeDefined();
        // expect(new LoginLog('not ip', 'not correct')).toBeUndefined();
    });

    it('The attributes to be set correctly after construction.', () => {

        const fakeIP = '102.250.6.57';
        const fakeLoginAttempt = ' { "timestamp": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';

        const loginLog = new LoginLog(fakeIP, fakeLoginAttempt);

        const attemptInfo = JSON.stringify(fakeLoginAttempt);
        const attemptObject = JSON.parse(attemptInfo);

        expect(loginLog.getContext()).toEqual(attemptObject.context);
        expect(loginLog.getLoginIP()).toEqual('102.250.6.57');
        expect(loginLog.getTimestamp()).toEqual(attemptObject.timestamp);
        expect(loginLog.getUserId()).toBeNull();
    });
});

describe('LoginLog enterSuccess function stores data correctly.', () => {
    
    it('enterSuccess is defined', () => {
        const fakeIP = '102.250.6.57';
        const fakeLoginAttempt = ' { "timestamp": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';

        const loginLog = new LoginLog(fakeIP, fakeLoginAttempt);

        const spy = spyOn(loginLog, 'enterSuccess');

        const checkpoint = ' { "timestamp": "2019-05-20T02:37:54.008Z", "userId":"google-oath2|5484181818181818" }';

        loginLog.enterSuccess(checkpoint);

        expect(spy).toHaveBeenCalled();

    });

    it('enterSuccess executes correctly.', () => {
        
        const fakeIP = '102.250.6.57';
        const fakeLoginAttempt = ' { "timestamp": "2019-05-20T02:35:54.008Z", "context": "loginController" } ';

        const loginLog = new LoginLog(fakeIP, fakeLoginAttempt);

        const checkpoint = ' { "timestamp": "2019-05-20T02:37:54.008Z", "userId":"google-oath2|5484181818181818" }';

        loginLog.enterSuccess(checkpoint);
        expect(loginLog.getLoginIime()).toEqual(JSON.parse(JSON.stringify(checkpoint)).timestamp);
        expect(loginLog.getUserId()).toEqual(JSON.parse(JSON.stringify(checkpoint)).userId);
    });
});
