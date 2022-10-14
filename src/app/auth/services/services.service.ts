import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private getUserEndPoint: string = 'http://localhost:3000/api/accounts' 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
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

  async getUsers() : Promise<Observable<any>> {
    this.http.head(this.getUserEndPoint, this.httpOptions)
    return this.http.get(this.getUserEndPoint)
  }

  deleteUser(userID: string) : Observable<User>{
    const url = `http://localhost:3000/api/accounts/${userID}`
    return this.http.delete<User>(url)
  }



}
