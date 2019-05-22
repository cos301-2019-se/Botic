import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { badWord } from './badWord';
import { BADWORDS } from './mock-badWords';


//Committable Change
@Injectable({
  providedIn: 'root'
})

export class TextScraperService {

  constructor() { }

  getBadWords(): Observable<badWord[]> {
		return of(BADWORDS);
  }

}
