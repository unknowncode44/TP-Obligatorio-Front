import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    gro_ups: new FormControl(''),
    user_permission: new FormControl(''),
    
  })

  

  

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

  onSubmit() {
    let _user: User = {           
      username          :this.userForm.value.username!,
      first_name        :this.userForm.value.first_name!,
      last_name         :this.userForm.value.last_name!,
      email             :this.userForm.value.email!,
      pass              :this.userForm.value.pass!,
      gro_ups           :this.userForm.value.gro_ups!,
      user_permission   :this.userForm.value.user_permission!,
      is_staff          :this.staff,
      is_active         :this.activeUser,
      is_superuser      :this.superUser
      
    }
    console.info(_user)
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
