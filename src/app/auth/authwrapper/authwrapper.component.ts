import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authwrapper',
  templateUrl: './authwrapper.component.html',
  styleUrls: ['./authwrapper.component.css']
})
export class AuthwrapperComponent implements OnInit {

  isActive: boolean = false

  logged$ = this.userService.logged$

  constructor(private userService: UserService){}

  ngOnInit(): void {
  }

  showRegisterLogin() {
    if(!this.isActive){
     this.isActive = true
    }
    else {
     this.isActive = false
    }
 }

}
