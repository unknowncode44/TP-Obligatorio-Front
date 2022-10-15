
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor( private _userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  //metodo que se ejecuta cuando el usuario clickea el boton ingresar

  login() {

    //validamos que el usuario ingrese datos

    if (this.username == '' || this.password == '') {
      alert('Todos los campos son obligatorios');
      return
    }

    //creamos el body

    const user:User={
      username: this.username,
      password: this.password,
    }

    // comprobamos que los campos sean validos, almaceno el token el localStorage y dirigimos al usuario al dashboard

    this._userService.login(user).subscribe({
      next:(token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard'])

      }
    })

  }
}
