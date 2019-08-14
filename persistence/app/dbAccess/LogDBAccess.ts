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

import { DatabaseAccess } from './DatabaseAccess';
import { Db, MongoClient } from 'mongodb';

export class LogDBAccess extends DatabaseAccess {

    constructor() {
        super();
    }

    public db!: Db;
    private readonly connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    public client!: MongoClient;

    protected connect(): void {
        this.connectDB();
    }

    // tslint:disable-next-line: typedef
    protected async connectDB() {
        console.log('inside logAccess connectDB');
        try {
            console.log('Trying to connect.');
            const client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true });
            console.log('Connected to database.');
            let db: Db;
            
            if (client) {
                db = client.db('logs');
                console.log('db is ' + JSON.stringify(this.db));
                return db;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    protected disconnect(): void {
        // not necessary, apparently
    }

    public save(log: string): any {
        // console.log('Inside logAccess save');
        // this.connectDB();
        this.saveMongo(log);
    }

    // tslint:disable-next-line: typedef
    public async saveMongo(log: string) {
        let results;

        try {
            // determine the kind of log
            const logObject = JSON.parse(JSON.stringify(log));
            
            // console.log('log ' + JSON.stringify(log));

            // console.log('attemptTime ' + logObject.attemptTime);
            
            const client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true });
            // console.log('Connected to database.');
            let db: Db;
            
            if (client) {
                db = client.db('logs');
                results = await db.collection('loginlogs').insertOne(logObject);
    
                return results.insertedId;
                // return true;
            } else {
                throw new Error('Cannot connect to the database.');
            }

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public delete(): void {

    }

    public update(): void {

    }

    public get(): any {

    }
}
