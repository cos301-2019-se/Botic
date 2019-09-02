import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { HttpModule } from '@angular/http';
import { botResponse } from './botResponse';

@Injectable({
  providedIn: 'root'
})

export class BotService {
  apiURL = environment.customerChat.baseUrl;

  constructor(private http: HttpClient){
    }

  getBotResponse(input: string): Observable<any> {
    var fd = new FormData();
    fd.append("data", input);

    return this.http.post(this.apiURL,fd).pipe(map((data: any) => {
          var cooled = data.replace(/'/g,'"');
          var response = JSON.parse(cooled);
          //console.log("Data: " + JSON.stringify(response));
          console.log("CODE: " + response.code);
          console.log("MESSAGE: " + response.message);
          return response;
        }));
  }
}
