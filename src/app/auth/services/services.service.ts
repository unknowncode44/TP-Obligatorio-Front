import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User>{
    const createUserUrl: string = 'http://localhost:3000/auth/signup'
    return this.http.post<User>(
      createUserUrl,
      user,
      { 
        observe: 'body',
        responseType: 'json',
      }
    )
  }
}
