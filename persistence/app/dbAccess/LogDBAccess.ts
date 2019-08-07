/**
 * File Name: LogDBAccess.ts
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
 * Purpose  :  This is class was made to implement database operations for the storage and retrieval of logs.
 *             This implementation will be using MongoDB.
 */

import DatabaseAccess from './DatabaseAccess';

class LogDBAccess extends DatabaseAccess {

    constructor() {
        super();
    }

    protected connectDB(): void {

    }

    protected disconnectDB(): void {

    }

    public save(): void {
        
    }

    public delete(): void {

    }

    public update(): void {

    }

    public get(): any {

    }
}

export default LogDBAccess;