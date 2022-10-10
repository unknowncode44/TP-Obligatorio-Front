import { Component, OnInit } from '@angular/core';

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
  

  constructor() { }

  ngOnInit(): void {
  }

  setActive(section:string){

    this.createUserActive = false;
    this.seeUserActive    = false;
    this.fundsActive      = false;
    this.settingsActive   = false;

    switch (section) {
      case 'createUser':
        this.createUserActive = !this.createUserActive
        break;
      case 'seeUsers':
        this.seeUserActive = !this.seeUserActive
        break;
      case 'seeFunds':
        this.fundsActive = !this.fundsActive
        break;
      case 'settings':
        this.settingsActive = !this.settingsActive
        break;

    }
  }

}
