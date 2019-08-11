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
        try {
            this.client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true });
            console.log('Connected to database.');
            if (this.client) {
                this.db = this.client.db('logs');
            }
        } catch (error) {
            console.log('Unable to connect to database.');
        }
    }

    protected disconnect(): void {
        // not necessary, apparently
    }

    public save(log: string): void | boolean {
        this.connectDB();
        this.saveMongo(log);
    }

    // tslint:disable-next-line: typedef
    public async saveMongo(log: string) {
        try {
            // determine the kind of log
            const logObject = JSON.parse(JSON.stringify(log));

            this.connect();

            const results = await this.db.collection('loginlogs').insertOne({
                userIP: logObject.userIP, attemptTime: logObject.attemptTime, context: logObject.context,
            });

            console.log(results.insertedId);
            // return true;
        } catch (error) {
            console.log('error connecting to database.');
            return false;
        }
    }

    public delete(): void {

    }

    public update(): void {

    }

    public get(): any {

    }
}
