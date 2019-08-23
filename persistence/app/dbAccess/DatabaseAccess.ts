/**
 * File Name: DatabaseAccess.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 */

/**
 * Purpose  :  This is class was made to allow for different databases to be used with our Database Manager.
 *             It is part of our application of the Bridge Design Pattern to our Database Manager, to make
 *             it easy to add or change databases.
 */

export abstract class DatabaseAccess {
  protected abstract connect(): void;

  protected abstract disconnect(): void;

  public abstract save(item: string): void | boolean;

  public abstract delete(): void;

  public abstract update(): void;

  public abstract get(id: string): any;
}
