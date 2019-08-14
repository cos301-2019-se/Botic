/**
 * File Name: checkToken.js
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
 * Purpose  :  This is will be used to check each route if there was a valid JWT in on the request header, 
 *             once done it will call the next function on the route which will be handled by the Database
 *             Manager.
 */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// jst secret key; can be changed to arbitrary value
const jwtSecret = 'D!MN';

export let checkToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // obtain token from header
    const token = req.headers['auth'] as string;
    let jwtPayload;

    // attempt token validation and obtain data
    try {
        // because this is a middleware function
        jwtPayload = jwt.verify(token, jwtSecret) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // respond with 401 (unauthorized error code)
        res.status(401).send();
        return;
    }

    // respond with a new token that has a new expiry
    const { subsystem, component } = jwtPayload;
    const newToken = jwt.sign({ subsystem, component }, jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);

    // pass controll to the Database Manager
    next();
};
