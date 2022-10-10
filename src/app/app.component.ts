import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  

export class AppComponent {
  title = 'online-store';

  isActive: boolean = false
  

  showRegisterLogin() {
     if(!this.isActive){
      this.isActive = true
     }
     else {
      this.isActive = false
     }
  }




}
