import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar/service/sidebar.service';

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

  
  users = this.sbService.createUserActive
  funds = this.sbService.fundsActive

  constructor(private sbService: SidebarService) { }

  ngOnInit(): void {
  }

}
