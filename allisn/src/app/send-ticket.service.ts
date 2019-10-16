import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SendTicketService {
  apiURL = environment.sendTicket.baseUrl;

  constructor(private http: HttpClient){
    }

  send(email: string, subject: string, body: string): Observable<any> {
    var fd = new FormData();
    fd.append("email", email);
    fd.append("subject", subject);
    fd.append("body", body);


    return this.http.post(this.apiURL,fd).pipe(map((data: any) => {
          var cooled = data.replace(/'/g,'"');
          var response = JSON.parse(cooled);
          console.log("Data: " + JSON.stringify(response));
          
          return response;
        }));
  }
}
