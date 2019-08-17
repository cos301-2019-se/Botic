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
    /**
     * Method name: startSession()
     * @param token
     * @param profile
     * 
     * Purpose: This function starts the session by storing all relevant data, i.e. passed in parameters, 
     * is stored.
     */
    public startSession(token: string, expiresAt: string, profile: string): void {
        
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_at', expiresAt);

    }

    public getExpiresAt(): number {
        return JSON.parse(localStorage.getItem('expires_at'));
    }

    public endSession(): void {
        // clear everything
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('expires_at');
    }
 }
