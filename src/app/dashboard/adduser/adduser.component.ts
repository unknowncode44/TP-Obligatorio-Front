import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  groups: string[] = [
    'Administracion', 
    'Logistica', 
    'Compras', 
    'Operaciones', 
    'Mantenimiento', 
    'RRHH'
  ]

  permissions: string[] = [
    'All',
    'Read',
    'Write'
  ]

  staff: boolean = true
  activeUser: boolean = false
  superUser: boolean = false


  constructor() { }

  ngOnInit(): void {
  }

  changeStaff(){
    this.staff = !this.staff
    console.log(this.staff);
    
  }

  changeActiveUser(){
    this.activeUser = !this.activeUser
    console.log(this.activeUser);
    
  }

  changeSuperUser() {
    this.superUser = !this.superUser
    console.log(this.superUser);
    
  }


}
