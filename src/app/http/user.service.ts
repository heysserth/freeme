import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(userLogin) {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-WEB-KEY': 'Production'
      })
    };
    return this.http.post(`${this.baseUrl}/in`, userLogin, httpOptions)
      .pipe(map((results: Response) => results),
        catchError(this.handleError));
  }


  getUserInfo() {
    const headers = new HttpHeaders()
            .set('X-WEB-KEY', 'Production')
            .set('X-DS-TOKEN', sessionStorage.getItem('dstoken'));
    return this.http.get(`${this.baseUrl}/users/myself`, {headers})
      .pipe(map((results: Response) => results),
        catchError(this.handleError));
  }

  getUserBalanceGraph() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-WEB-KEY': 'Production',
        'X-DS-TOKEN': sessionStorage.getItem('dstoken')
      })
    };
    const options = {
      headers: {
        'X-WEB-KEY': 'TestMobile',
        'X-DS-TOKEN': sessionStorage.getItem('dstoken')
      }
    };
    console.log('httpOptions', options);
    return this.http.get(`${this.baseUrl}/users/myself/graph`, httpOptions)
      .pipe(map((results: Response) => results),
        catchError(this.handleError));
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error || error);
  }

}
