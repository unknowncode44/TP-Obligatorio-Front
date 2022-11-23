import { Component, OnInit }      from '@angular/core';

// implementamos angular forms
import { FormGroup, FormControl } from '@angular/forms'; 

// Servicio de usuario
import { AuthService }            from 'src/app/auth/services/auth.service';
import { UserEventsService }      from 'src/app/common_services/user-events.service';

// modelo de usuario
import { User }                   from '../models/user.model';

// toast 
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [MessageService]
})
export class AdduserComponent implements OnInit {

  

  // creamos el formulario al inicio del componente
  // declaramos los componentes del formulario para llamarlos desde la vista
  userForm = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    gro_ups: new FormControl(''),
    user_permission: new FormControl(''),
    
  })

  // definimos los posibles grupos
  groups: string[] = [
    'Administracion', 
    'Logistica', 
    'Compras', 
    'Operaciones', 
    'Mantenimiento', 
    'RRHH'
  ]

  // definimos los tipos de permiso
  permissions: string[] = [
    'All',
    'Read',
    'Write'
  ]

  // booleanos que definiran los roles del usuario
  staff: boolean = true
  activeUser: boolean = false
  superUser: boolean = false


  constructor(
    private authService : AuthService,
    private uEService   : UserEventsService,
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig
    ) { }

  // loading sppiner
  loading$ = this.authService.loading$

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  // funcion on submit para el envio del formulario
  /*
  Esta funcion deberia capturar los datos ingresados en el formulario y llamar
  a la funcion crear usuario
  TODO: Implementar NGToast o similar para mostrar exito / error / advertencia
  */ 
  async onSubmit() {
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
    await this.authService.createUser(_user).then((resp) => {
      resp.subscribe(
        resp => {
          console.info(resp);
          this.messageService.add({key: 'bc', severity:'success', summary: 'Exito!', detail: 'Usuario creado con exito'});
          this.uEService.newUser(_user)
        }
      )
    })
  }

  // funciones para cambiar los checks del formulario
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
