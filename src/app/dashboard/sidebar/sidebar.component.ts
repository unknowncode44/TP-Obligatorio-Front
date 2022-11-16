import { Component, OnInit } from '@angular/core';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  createUserActive  : boolean = false;
  seeUserActive     : boolean = false;
  fundsActive       : boolean = false;
  settingsActive    : boolean = false;

  userRole  = localStorage.getItem('user_role')

  canSee: boolean = true   
  

  constructor(private sbService: SidebarService) {
  }

  ngOnInit(): void {
    this.checkRole(this.userRole!)
  }

  setActive(section:string){
    this.sbService.setActive(section)
  }

  checkRole(role: string){
    if(role === 'Read'){
      this.canSee = !this.canSee
    }
  }


}
