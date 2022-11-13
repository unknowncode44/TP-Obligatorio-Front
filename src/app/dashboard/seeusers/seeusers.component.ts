import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { AuthService }        from 'src/app/auth/services/auth.service';
import { UserEventsService } from 'src/app/common_services/user-events.service';
import { User }               from '../models/user.model';

@Component({
  selector: 'app-seeusers',
  templateUrl: './seeusers.component.html',
  styleUrls: ['./seeusers.component.css']
})
export class SeeusersComponent implements OnInit {

  // definimos un array con usuarios para mostrarlos en la tabla
  usersArr: User[] = [];
  totalUsers: string = ''; // usuarios totales
  totalCommonUsers: string = ''; // usuarios comunes
  totalAdmins: string = '';  // usuarios administradores

  // array auxiliar que usaremos en distintas instancias
  arrayUsrs: User[] = []

  // loading sppiner
  loading$ = this.userService.loading$

  constructor(
    public userService: AuthService, 
    private router    : Router,
    private uEService : UserEventsService) {

    // en el constructor ya solicitamos los usuarios para mostrarlos en la tabla
    this.userService.getUsers().then(
      p => {
        p.subscribe((res) => {
          this.usersArr = res.result
          this.totalUsers = this.usersArr.length.toString();
          this.totalAdmins = this.getAdmins().length.toString();
          this.totalCommonUsers = (this.usersArr.length - this.getAdmins().length).toString();
        }
        )
      })
  }

  ngOnInit(): void {
    this.uEService.newUserEvent.subscribe((newUser: User) => {
      this.userService.getUsers().then(p => {
        p.subscribe((res) => {
          this.usersArr = res.result
          this.totalUsers = this.usersArr.length.toString();
          this.totalAdmins = this.getAdmins().length.toString();
          this.totalCommonUsers = (this.usersArr.length - this.getAdmins().length).toString();
        })
      })
    })
  }

  deleteUser(userID: string ){
    this.userService.deleteUser(userID).subscribe(() => {
      this.usersArr = this.usersArr.filter( 
        (u: User) => u.user_id!.toString() !== userID
        )
    })
    
  }

  

  getAdmins(): User[] {
    const _usrArr = this.usersArr
    let admArray: User[] = []
    for (let i = 0; i < _usrArr.length; i++) {
      const e = _usrArr[i];
      if (e.user_permission === 'all' || e.user_permission === 'All') {
        admArray.push(e)
      }
    }

    return admArray;

  }

}
