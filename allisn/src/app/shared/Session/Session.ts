/**
 * File Name: Session.ts
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
 * Purpose  :  This is class was made to decouple the specific implementation of the storage of session data.
 *             This is also an implementation of the bridge design pattern-- session data can be stored in
 *             either LocalStorage or Cookies; each has their own advantages versus disadvantages.
 */

 export class Session {
     public startSession(token: JSON, profile: JSON): void {
         // store session in Cookie
         // take implementation from auth.service.ts
     }

     public endSession(): void {
         // clear everything
     }
 }
