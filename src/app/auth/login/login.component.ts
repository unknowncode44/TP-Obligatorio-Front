
import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router }                 from '@angular/router';
import { json } from 'express';
import { UserEventsService } from 'src/app/common_services/user-events.service';
import { User }                   from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService }            from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm =  new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  username: string = '';
  password: string = '';

  constructor(
    private _userService: UserService, 
    private router      : Router,
    private authService : AuthService,
    private uEService   : UserEventsService
    ) { }

  ngOnInit(): void {
  }

  //metodo que se ejecuta cuando el usuario clickea el boton ingresar

  login() {
    this.password = this.userForm.value.password!;
    this.username = this.userForm.value.username!;

    //validamos que el usuario ingrese datos

    if (this.username == '' || this.password == '') {
      alert('Todos los campos son obligatorios');
      return
    }

    //creamos el body

    const user: User = {
      username: this.username,
      pass: this.password,
    }

    // comprobamos que los campos sean validos, almaceno el token el localStorage y dirigimos al usuario al dashboard
    this._userService.login(user).then(res => {
      res.subscribe((token) => {

        
        //! La respuesta que recibimos es un objeto, no un string, por ello hay que parsearla   
        var _token = JSON.parse(JSON.stringify(token))

        // una vez parseada la pasamos al localstorage
        localStorage.setItem('token', _token.token);

        // tambien recolectamos otros datos que nos seran utiles
        let user_f_name = _token.result[0].first_name;
        let user_id     = _token.result[0].user_id;
        localStorage.setItem('fristName', user_f_name);
        localStorage.setItem('user_id', user_id);

        // avisamos al servicio de eventos de usuario
        this.uEService.loggedUser(user_f_name)
        
        // avisamos que el login fue exitoso
        this._userService.loginSuccess()

        // navegamos a dashboard
        this.router.navigate(['/dashboard'])
  
      }
      )
    }
    )




    // .subscribe({
    //   next:(token) => {
    //     console.log(token);

    //     localStorage.setItem('token', token);
    //     this.router.navigate(['/dashboard'])

    //   }
    // })

    // }
  }
}
