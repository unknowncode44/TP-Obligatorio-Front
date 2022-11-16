import { Component, Input, OnInit } from '@angular/core';
import { UserEventsService } from '../common_services/user-events.service';
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

  username: string = ''

  userRole  = localStorage.getItem('user_role')

  canSee: boolean = true   

  
  users     = this.sbService.createUserActive
  funds     = this.sbService.fundsActive
  settings  = this.sbService.settingsActive

  constructor(
    private sbService: SidebarService,
    private uEService: UserEventsService,
    ) {
      
    }

  ngOnInit(): void {
    this.username = localStorage.getItem('fristName')! 
    this.uEService.loggedUserName.subscribe(
      p => {
        this.username = p
      }
    )
  }

  checkRole(role: string){
    if(role === 'read'){
      this.canSee = !this.canSee
    }
  }



}
