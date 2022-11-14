import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  constructor(private sbService: SidebarService) { }

  ngOnInit(): void {
  }

  setActive(section:string){
    this.sbService.setActive(section)
  }

}
