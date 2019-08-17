/**
 * File Name: index.js
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
 * Purpose  :  This is will be used to handle our routes so that we can use router middleware for our API.
 */

import { Router } from 'express';

import DatabaseManager from '../dbManager/DatabaseManager';
import { checkToken } from '../middleware/checkToken';

const router = Router();

// saveLog endpoint
router.post('/saveLog', [checkToken] , DatabaseManager.saveLog);

// getLog endpoint
router.get('/getLog', [checkToken], DatabaseManager.getLog);
// here we include the full log in JSON format as retrieved from the database.

export default router;
