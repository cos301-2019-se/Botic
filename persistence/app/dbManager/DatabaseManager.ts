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

import DatabaseAccess from '../dbAccess/DatabaseAccess';
import LogDBAccess from '../dbAccess/LogDBAccess';

class DatabaseManager {

  // edit: no need- definite assignment assertion modifier, '!', used here as this property will be initialized elsewhere
  private logDbAccess: DatabaseAccess;

  constructor() {
    this.logDbAccess = new LogDBAccess();
  }

  // wondering why this function is not 'async'? Me too.
  saveLog(req: any, res: any) {
    this.logDbAccess.save();
  }

  getLog(req: any, res: any) {
    this.logDbAccess.get();
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