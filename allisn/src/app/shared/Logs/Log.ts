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
 * Purpose  :  This is class is used in implementation of the Factory Method design pattern, to create and 
 *              add new logs in an orderly way.
 */

 // tslint:disable-next-line: interface-name
 export abstract class Log {
    protected timestamp: JSON;
    protected context: JSON;
    protected userId: JSON;
 }
