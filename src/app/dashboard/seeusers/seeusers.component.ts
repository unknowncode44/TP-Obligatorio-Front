import { Component, OnInit } from '@angular/core';
import { users_array_mock } from '../mocked_data/users.mock';
import { User } from '../models/user.model';

@Component({
  selector: 'app-seeusers',
  templateUrl: './seeusers.component.html',
  styleUrls: ['./seeusers.component.css']
})
export class SeeusersComponent implements OnInit {

  /*
  TODO: 
  aca debemos reemplazar el array_mock por el que obtendremos
  de la base de datos, esto se debe de ejecutar el en el inicio
  */ 
  usersArr: User[] = users_array_mock;
  totalUsers: string = ''; // usuarios totales
  totalCommonUsers: string = ''; // usuarios comunes
  totalAdmins: string = '';  // usuarios administradores

  constructor() {
    this.totalUsers = this.usersArr.length.toString();
    this.totalAdmins = this.getAdmins().length.toString();
    this.totalCommonUsers = (this.usersArr.length - this.getAdmins().length).toString();

  }

  ngOnInit(): void {
  }

  getAdmins(): User[] {
    const _usrArr = this.usersArr
    let admArray: User[] = []
    for (let i = 0; i < _usrArr.length; i++) {
      const e = _usrArr[i];
      if(e.user_permission = 'all'){
        admArray.push(e)
      }
    }

    return admArray;

  }

}
