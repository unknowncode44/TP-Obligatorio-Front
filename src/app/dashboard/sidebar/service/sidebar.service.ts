import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _createUserActive  = new BehaviorSubject<boolean>(false);  
  private _seeUserActive     = new BehaviorSubject<boolean>(false);
  private _fundsActive       = new BehaviorSubject<boolean>(false);
  private _settingsActive    = new BehaviorSubject<boolean>(false);

  public readonly createUserActive  = this._createUserActive.asObservable();  
  public readonly seeUserActive     = this._seeUserActive.asObservable();
  public readonly fundsActive       = this._fundsActive.asObservable();
  public readonly settingsActive    = this._settingsActive.asObservable();

  constructor() { }

  setActive(section:string){

    this._createUserActive.next(false)  
    this._seeUserActive.next(false)   
    this._fundsActive.next(false)     
    this._settingsActive.next(false)  

    switch (section) {
      case 'createUser':
        this._createUserActive.next(true) 
        break;
      case 'seeUsers':
        this._seeUserActive.next(true)    
        break;
      case 'seeFunds':
        this._fundsActive.next(true)      
        break;
      case 'settings':
        this._settingsActive.next(true)   
        break;

    }
  }
}
