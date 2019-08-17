/**
 * File Name: controller.service.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 *
 */

import { Injectable } from '@angular/core';

// tslint:disable-next-line: no-implicit-dependencies
// tslint:disable-next-line: no-submodule-imports

import { Log } from '../../shared/Logs/Log';


@Injectable()
export abstract class Controller {

    // this member is used to hold a concrete log
    protected log: any;
}
