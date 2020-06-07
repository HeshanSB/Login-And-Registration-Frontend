import { Injectable, ErrorHandler } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Response } from '../response';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  loginUser(loginUser: Login):Observable<Response>{

    return this.http
        .post<Response>("http://localhost:8080/user/login", loginUser)
        .pipe(catchError((e:any)=> Observable.throw(this.handle(e))));
  }

  handle(e) {
    this.errorHandler.handleError(e);
  }
}
