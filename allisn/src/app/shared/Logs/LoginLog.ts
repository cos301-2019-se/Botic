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
    constructor(adminIP: JSON, loginAttempt: JSON) {
        super();
    }

    public enterSuccess(loginSuccess: JSON): void {
        // change log state
    }
}
