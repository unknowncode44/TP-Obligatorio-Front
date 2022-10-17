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
  

  constructor(private sbService: SidebarService) { }

  ngOnInit(): void {
  }

  setActive(section:string){
    this.sbService.setActive(section)
  }

}
