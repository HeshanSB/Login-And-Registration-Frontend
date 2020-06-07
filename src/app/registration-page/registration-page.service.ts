import { Injectable, ErrorHandler } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Response } from '../response';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationPageService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  registerUser(registerUser: Registration):Observable<Response>{

    return this.http
        .post<Response>("http://localhost:8080/user/register", registerUser)
        .pipe(catchError((e:any)=> Observable.throw(this.handle(e))));
  }

  handle(e) {
    this.errorHandler.handleError(e);
  }
}
