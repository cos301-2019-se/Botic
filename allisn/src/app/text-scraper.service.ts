import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { badWord } from './badWord';
import { BADWORDS } from './mock-badWords';

import { MessageService } from './message.service';

//Committable Change
@Injectable({
  providedIn: 'root'
})

export class TextScraperService {
  private apiURL = 'http://botic-ai-ms.herokuapp.com';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getBadWords(): Observable<badWord[]> {
    //API URL http://botic-ai-ms.herokuapp.com

    var fd = new FormData();

    fd.append("body", "Hi my name is Gareth and my surname is cucaracha and my password is america123penis");

    this.http.post(this.apiURL, fd).subscribe(data => this.log("Dayta: " + data));

    //this.messageService.add("TextScraperService: fetched badWords");
		return of(BADWORDS);
  }


  private log(message: string) {
    this.messageService.add(`${message}`);
  }

}
