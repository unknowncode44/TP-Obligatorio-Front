import { Injectable }                               from '@angular/core';
import { HttpClient, HttpHeaders }                  from '@angular/common/http';
import { BehaviorSubject, Observable, throwError }  from 'rxjs';
import { User }                                     from '../models/user.model';


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

  // variables privadas para el url y el header
  // TODO: guardar url en variable de entorno 
  private getUserEndPoint: string = 'http://localhost:3000/api/accounts' 
  private httpOptions = {
            headers: {
              'Content-Type': 'application/json',
              'x-token'     : localStorage.getItem('token') || '',
            },
}

  // requerimos instancia de HTTP CLient.
  constructor(private http: HttpClient) { }


  async createUser(user: User) : Promise<Observable<User>>{
    const createUserUrl: string = 'http://localhost:3000/api/accounts';
    return this.http.post<User>(createUserUrl, user, this.httpOptions)
    
  }

  async getUsers() : Promise<Observable<any>> {
    // hacemos la solicitud, pasamos el endpoint y el headerOptions que creamos
    // y retornamos la respuesta
    return this.http.get(this.getUserEndPoint, this.httpOptions)
  }

  async getUser(userID: string) : Promise<Observable<any>> {
    const getUserUrl: string = `http://localhost:3000/api/accounts/${userID}`;
    // hacemos la solicitud, pasamos el endpoint y el headerOptions que creamos
    // y retornamos la respuesta
    return this.http.get(getUserUrl, this.httpOptions)
  }

  deleteUser(userID: string) : Observable<User>{
    const url = `http://localhost:3000/api/accounts/${userID}`
    return this.http.delete<User>(url)
  }

  async updateUser(userID: string, user: {}) : Promise<Observable<User>> {
    const url = `http://localhost:3000/api/accounts/${userID}`
    return this.http.put<User>(url, user, this.httpOptions)
  }

  async uploadPicture(userID: string, file: File) : Promise<Observable<any>>{
    const url = `http://localhost:3000/api/uploads/${userID}`
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post<any>(url, formData)
  }

  async getPicture(userID: string): Promise<Observable<any>>{
    const url = `http://localhost:3000/api/uploads/users/${userID}`
    return this.http.get<any>(url, {responseType: 'blob' as 'json'})
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
