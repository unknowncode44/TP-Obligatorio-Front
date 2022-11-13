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

  
  users = this.sbService.createUserActive
  funds = this.sbService.fundsActive

  constructor(
    private sbService: SidebarService,
    private uEService: UserEventsService,
    ) {
      
    }

  ngOnInit(): void { 
    this.checkName()
    if(this.username === ''){
      this.checkName()
    }
  }

  checkName() {
    this.uEService.loggedUserName.subscribe(
      (name: string) => {
        console.log(name + "  <==++");
        this.username = name
      }
    )
  }

}
