import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpModule } from '@angular/http';
import { badWord } from '../../models/badWord';
import { BADWORDS } from '../../models/mock-badWords';

//Committable Change
@Injectable({
  providedIn: 'root'
})

export class TextScraperService {
  private apiURL = environment.scrapper.baseUrl;
  /*
    private apiURL = 'https://botic-ai-ms.herokuapp.com/scrub';
    private testingURL1 = 'https://reqres.in/api/register';
  */
  constructor(private http: HttpClient){
  }

  /*
  getBadWords(): Observable<any> {
    //API URL http://botic-ai-ms.herokuapp.com

    //Test1 - Call Test
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))

    //Test2 - POST Test
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
      })
    };

    var fd_test = new FormData();
    fd_test.append("email", "eve.holt@reqres.in");
    fd_test.append("password", "pistol");

    var req = {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }

    this.http.post(this.testingURL1, req).subscribe(
      data => (console.log(data)),
      error => console.log("api request failed", error)
    );

    //Test3 - Heroku Test
    var fd = new FormData();
    let response: string;
    fd.append("data", "Hi my name is Gareth and my surname is cucaracha and my password is america123.");

    return this.http.post(this.apiURL, fd);
  }
  */

  public getBadWords(): Observable<any> {
    let fd = new FormData();
    fd.append('data', 'Hi my name is Gareth and my surname is cucaracha and my password is america123.');

    return this.http.post(this.apiURL, fd).pipe(map((data: any) => {
          let cooled = data.replace(/'/g, '"');
          console.log(cooled);
          let words = JSON.parse(cooled);
          console.log('Data: ' + JSON.stringify(words));

          // badWord badWords = [];

          return words;
        }));
  }

  public getBadWordsFromInput(input: string): Observable<any> {
    let fd = new FormData();
    fd.append('data', input);

    return this.http.post(this.apiURL,fd).pipe(map((data: any) => {
          console.log("Data: " + data)
          var cooled = data.replace(/'/g,'"');
          var words = JSON.parse(cooled);
          //console.log(cooled);
          console.log("Data: " + JSON.stringify(words));



          return words;
        }));
    // return of(BADWORDS);
  }
}
