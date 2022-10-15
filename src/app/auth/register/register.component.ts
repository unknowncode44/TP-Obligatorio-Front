import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string ='';
  password: string = '';
  confirmPassword: string = '';

  constructor( private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  //metodo para agregar el usuario

  addUser() {

    //validar que el usuario ingrese valores

    if(this.username == '' || this.password == '' || this.confirmPassword == ''){
      alert('Todos los campos son obligatorios');
      return;
    }

    //validamos que las password sean iguales

    if(this.password !== this.confirmPassword) {
      alert('Los passwords ingresados no coinciden');
      return;
    }

    // Creamos el objeto

    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.signIn(user).subscribe(data => {
      alert('El usuario ${this.username} se creó correctamente');

      // una vez registrado el usuario, navego al dashboard

      this.router.navigate(['/login']);
    })

  }

}
