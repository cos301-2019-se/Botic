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

  // wondering why this function is not 'async'? Me too.
  // tslint:disable-next-line: typedef
  public async saveLog(req: Request, res: Response) {
    // this.logDbAccess.save();

    // process the log in the body
    // if only use case controllers are allowed to send logs, then define a regex to check
    // for the word 'controller' in the component part.
    // if (res.locals.jwtPayload.componen

    // console.log('Inside savelog');
    let result;
    try {

      // console.log('about to call log access');

      const logDbAccess = new LogDBAccess();

      result = await logDbAccess.save(req.body);

      // console.log('result: ' + result);
    } catch (error) {
      console.log(error);
      res.status(598).send(error);
      return;
    }

    if (result) {
      res.locals.message = result;
      res.status(200).send('Log saved successfully.');
    } else {
      res.locals.message = result;
      res.status(599).send('Error: Incorrect Log format.');
    }
  }

  getLog(req: any, res: any) {
    // this.logDbAccess.get();
  }

  // example
  getAllTodos(req: any, res: any) {
      return res.status(200).send({
          success: 'true',
          message: 'todos retrieved successfully',
          todos: DatabaseAccess,
      });
  }

  // example
  createTodo(req: any, res: any) {
      if (!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required',
        });
      }
      const todo = {
        id: DatabaseAccess.length + 1,
        title: req.body.title,
        description: req.body.description,
      };
      //DatabaseAccess.push(todo);
      return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo,
      });
  }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
