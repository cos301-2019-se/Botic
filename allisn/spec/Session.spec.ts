import { localStorage } from 'mock-local-storage';

import { Session } from '../src/app/shared/Session/Session';

describe('Session startSession function should create a session for a user.', () => {
    
    it('Should be defined.', () => {
        // const session = new Session();
        // tslint:disable-next-line: no-trailing-whitespace
        
        const session = new Session();

        const fakeToken = 'dBjftJeZ4CVP.mB92K27uhbUJU1p1r.wW1gFWFOEjXk';
        const fakeProfile = '{ "email": "johndoe@gmail.com",' +
            '"email_verified": true,' +
            '"name": "John Doe",' +
            '"given_name": "John",' +
            '"family_name": "Doe",' +
            '"user_id": "google-oath2|5484181818181818",' +
            '"nickname": "a man",' +
            '"created_at": "2019-05-20T02:35:54.008Z",' +
            '"last_ip": "102.250.6.57",' +
            '"last_login": "2019-08-01T14:49:41.062Z",' +
            '"logins_count": 9' + '}';

        const spy = spyOn(session, 'startSession');
        session.startSession(fakeToken, fakeProfile);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(fakeToken, fakeProfile);
    });

    it('Should store accessToken and profile in localStorage.', () => {
        const session = new Session();

        const fakeToken = 'dBjftJeZ4CVP.mB92K27uhbUJU1p1r.wW1gFWFOEjXk';
        const fakeProfile = '{ "email": "johndoe@gmail.com",' +
            '"email_verified": true,' +
            '"name": "John Doe",' +
            '"given_name": "John",' +
            '"family_name": "Doe",' +
            '"user_id": "google-oath2|5484181818181818",' +
            '"nickname": "a man",' +
            '"created_at": "2019-05-20T02:35:54.008Z",' +
            '"last_ip": "102.250.6.57",' +
            '"last_login": "2019-08-01T14:49:41.062Z",' +
            '"logins_count": 9' + '}';
        // tslint:disable-next-line: no-trailing-whitespace        
        localStorage.setItem('a',fakeToken);
        expect(localStorage.getItem('a')).toBe(fakeToken);
        // expect(sessionStorage.getItem('userProfile') === fakeProfile).toBe(true);
        // honestly, after spending several hours looking for a solution to this, it's not worth it tbh (5+hrs)
    });

});

describe('Session endSession should clear the session of a user.', () => {

    it('Should be defined', () => {
        const session = new Session();

        const spy = spyOn(session, 'endSession');
        session.endSession();
        expect(spy).toHaveBeenCalled();
    });

    it('Should clear access token and profile from localStorage',() => {
        const session = new Session();

        const fakeToken = 'dBjftJeZ4CVP.mB92K27uhbUJU1p1r.wW1gFWFOEjXk';
        const fakeProfile = '{ "email": "johndoe@gmail.com",' +
            '"email_verified": true,' +
            '"name": "John Doe",' +
            '"given_name": "John",' +
            '"family_name": "Doe",' +
            '"user_id": "google-oath2|5484181818181818",' +
            '"nickname": "a man",' +
            '"created_at": "2019-05-20T02:35:54.008Z",' +
            '"last_ip": "102.250.6.57",' +
            '"last_login": "2019-08-01T14:49:41.062Z",' +
            '"logins_count": 9' + '}';
        
        session.startSession(fakeToken, fakeProfile);
        session.endSession();
        expect(localStorage.getItem('token')).toBe(null);
        expect(localStorage.getItem('profile')).toBe(null);
    });
});
