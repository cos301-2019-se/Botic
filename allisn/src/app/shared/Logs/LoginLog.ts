/**
 * File Name: Log.ts
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
 * Purpose  :  This is class is used to store login log information for the Login Use Case.
 */

import { Log } from '../Logs/Log';

export class LoginLog extends Log {

    constructor(userIP: string, loginAttempt: string) {
        super();

        const attemptInfo = JSON.stringify(loginAttempt);
        const attemptObject = JSON.parse(attemptInfo);
        

        this.timestamp = attemptObject.timestamp;
        this.context = attemptObject.context;
        this.userIP = userIP;
        this.userId = null;
    }

    protected userIP: string;
    // check if these match up with auth0's
    protected loginTime: string;

    /**
     * Method name: enterSuccess() is a checkpoint when the user has logged in, 
     * it process and stores the timestamp and sets the userID.
     * @param loginSuccess contains the timestamp, userID
     */
    public enterSuccess(loginSuccess: string): void {
        const successObject = JSON.parse(JSON.stringify(loginSuccess));

        this.userId = successObject.userId;
        this.loginTime = successObject.timestamp;
    }

    public getLoginIime(): string {
        return this.loginTime;
    }

    public getLoginIP(): string {
        return this.userIP;
    }

    public getTimestamp(): string {
        return this.timestamp;
    }

    public getContext(): string {
        return this.context;
    }

    public getUserId(): string {
        return this.userId;
    }
}
