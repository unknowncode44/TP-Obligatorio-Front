import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/dashboard/models/user.model'
import { AuthService } from 'src/app/auth/services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  

  editForm = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    file_text: new FormControl(''),
    file: new FormControl('')
    
  })


  usersArray: User[] = [];
  actualName: string = '';
  actualLastName: string = '';
  actualEmail: string = '';

  myId: string = localStorage.getItem('user_id')! 

  imgActive: boolean = false

  imgLink?: SafeUrl
  loading: boolean = false
  file?: File


 

  constructor(private auth: AuthService, private sanitizer: DomSanitizer) {
   
    this.editForm.controls.name.disable();
    this.editForm.controls.last_name.disable();
    this.editForm.controls.email.disable();
    

    
  }

  ngOnInit(): void {
    this.auth.getUsers().then(p => {
      p.subscribe((res) => {
        this.usersArray = res.result
        for (let i = 0; i < this.usersArray.length; i++) {
          const e = this.usersArray[i];
          if(e.user_id!.toString() === this.myId){
            this.actualEmail    = e.email;
            this.actualName     = e.first_name;
            this.actualLastName = e.last_name
            break
          }
          
        }
        
        
        
      })
    })
    this.auth.getPicture(this.myId).then(r => {
      r.subscribe(res => {
        console.log(res);
        
        let imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
        this.imgLink = imgUrl
        
      })
    }) 
  }

  enableForm() {
    document.getElementById('name_')?.classList.add('active')
    document.getElementById('last_name_')?.classList.add('active')
    document.getElementById('email_')?.classList.add('active')
   
    this.editForm.controls.name.enable();
    this.editForm.controls.name.setValue(this.actualName)
    this.editForm.controls.last_name.enable();
    this.editForm.controls.last_name.setValue(this.actualLastName);
    this.editForm.controls.email.enable();
    this.editForm.controls.email.setValue(this.actualEmail);
  }

  async submitChanges(){

    if(this.imgActive){
      this.onUpload()
    }
    

    else {
      this.editForm.controls.name.disable();
    this.editForm.controls.last_name.disable();
    this.editForm.controls.email.disable();

    document.getElementById('name_')?.classList.remove('active')
    document.getElementById('last_name_')?.classList.remove('active')
    document.getElementById('email_')?.classList.remove('active')

    let changes = {
      name: this.editForm.value.name,
      last_name: this.editForm.value.last_name,
      email: this.editForm.value.email,
    }

    
    

    await this.auth.updateUser(this.myId, changes)
    .then( r => {
      r.subscribe((res) => {
        console.log(res);
        
      })
      
    })
    }
    
    

  }

  
  showImgInput(){
    let box = document.getElementById('input-box-upload');
    box?.classList.add('active')
    this.imgActive = true
  }

  enableImgUpload(){
    document.getElementById('file')?.click()
  }
  changeText(event: any){
    this.file = event.target.files[0]
    this.editForm.controls.file_text.setValue(this.editForm.controls.file.getRawValue());
      
  }
  
  async onUpload(){
    this.loading = !this.loading;
    await this.auth.uploadPicture(this.myId, this.file!).then(r => {
      r.subscribe((res) => {
        console.log(res);
        
      })
    })
  }
  

}
