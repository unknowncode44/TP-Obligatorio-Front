import { Injectable, EventEmitter, Output } from '@angular/core';
import { User } from '../dashboard/models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UserEventsService {

  // este evento comunicara que se creado un nuevo usuario
  @Output() newUserEvent    = new EventEmitter<User>()

  // este evento comunicara el nombre del usuario en sesion 
  @Output() loggedUserName  = new EventEmitter<string>()

  constructor() { }

  newUser(user: User){
    this.newUserEvent.emit(user)
  }

  loggedUser(username: string){
    this.loggedUserName.emit(username)

  }



}
