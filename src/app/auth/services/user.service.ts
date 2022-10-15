import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // variable que almacena el string de enviroments. endpoint
  private myAppUrl: string;

  // si tenemos varias Apis, en este caso almacena api/users
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
  }

  //metodo que va a recibir un user, que va a ser de la interfaz user que creamos
  // devuelve un observable de tipo interfaz

  signIn(user: User): Observable<any> {

    //pasamos la url y el body que es el que tenemos en User
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  // creamos metodo login recibe un usuario y devuelve un observable con el token que recibe del usuario registrado

  login(user:User):Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }

}
