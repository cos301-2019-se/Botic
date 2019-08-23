/**
 * File Name: DatabaseManager.ts
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
 * Purpose  :  This is class was made to handle all database queries. It was introduced to decouple all use
 *             case controllers from the databases and their respective implementations.
 */

import { DatabaseAccess } from '../dbAccess/DatabaseAccess';
import { LogDBAccess } from '../dbAccess/LogDBAccess';
import { Request, Response } from 'express';

class DatabaseManager {

  constructor() {
    
  }

  // tslint:disable-next-line: typedef
  public async saveLog(req: Request, res: Response) {
    // if only use case controllers are allowed to send logs, then define a regex to check
    // for the word 'controller' in the component part.

    let result;

    try {
      const logDbAccess = new LogDBAccess();
      result = await logDbAccess.save(req.body);

      if (result === 'inserted') {
        return res.status(201).send({
          success: 'true',
          message: 'Log saved successfully.',
        });
      } else if (result === 'error') {
        return res.status(400).send({
          success: 'false',
          message: 'Database error.',
        });
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: 'false',
        message: error,
      });
    }
  }

  // tslint:disable-next-line: typedef
  public async getLog(req: Request, res: Response) {
    
    try {
      const logDbAccess = new LogDBAccess();

      const result = await logDbAccess.get(req.body);
      
      if ( result === 'error' ) {

        return res.status(500).send({
          success: 'false',
          message: 'Database error.',
        });

      } else if ( result === 'none') {

        return res.status(428).send({
          success: 'false',
          message: 'No recent login attempt from this IP.',
        });

      } else if (result) {

        return res.status(200).send({
          success: 'true',
          message: 'Retrieved log successfully',
          log: result,
        });

      }

      res.status(500).send({
        success: 'false',
        message: 'Something is up',
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: 'false',
        message: error,
      });
    }
  }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
