import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /* TODO: 
  Aca deberiamos completar con el nombre de usuario
  que obtenemos desde la base de datos. Es una varibale que
  deberia cargarse en incio
  */ 
  username: string = 'Roberto' 
  constructor() { }

  ngOnInit(): void {
  }

}
