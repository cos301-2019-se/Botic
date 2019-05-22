import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

import { badWord } from './badWord';
import { BADWORDS } from './mock-badWords';


//Committable Change
@Injectable({
  providedIn: 'root'
})

export class TextScraperService {

  constructor(
    /*private http: HttpClient,*/
    private messageService: MessageService
  ) { }

  getBadWords(): Observable<badWord[]> {
    //return this.http.get<badWord[]>("")
    this.messageService.add('TextScraperService: fetched badWords');
		return of(BADWORDS);
  }



}
