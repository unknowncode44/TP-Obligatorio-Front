import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // definimos variable para cuando el programa esta cargando
  private _loading = new BehaviorSubject<boolean>(false);

  // la manera de no afectar la variable original es exponerla como un observable,
  // de esa manera nos aseguramos que la variable booleana original solo sera modificada 
  // dentro de los metodos propios del servicio
  public readonly loading$ = this._loading.asObservable();

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

  async createUser(user: User) : Promise<Observable<User>>{
    const createUserUrl: string = 'http://localhost:3000/auth/signup'
    return this.http.post<User>(createUserUrl, user, {
      observe: 'body',
      responseType: 'json'
    })
  }

  async getUsers() : Promise<Observable<any>> {
    this.http.head(this.getUserEndPoint, this.httpOptions)
    return this.http.get(this.getUserEndPoint)
  }

  deleteUser(userID: string) : Observable<User>{
    const url = `http://localhost:3000/api/accounts/${userID}`
    return this.http.delete<User>(url)
  }


  // loading spinner durante los estados de carga
  
  show() {
    this._loading.next(true)
  }


  hide(){
    setTimeout(() => {
      this._loading.next(false)
    }, 500)
    
  }



}
