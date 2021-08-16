import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../services/storage.service';
import { registrationList } from '../interfaces/registration.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.sevice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storage: LocalStorageService,private fb:FormBuilder , 
   private router:Router, private authService: AuthService
    ) { }


  arrList:Array<registrationList> = [];
  Password:any = '';
  Login:string = ''
  loginSignUp:any
  passwordMatch!:boolean 

  ngOnInit(): void {
    this.loginSignUp = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
      this.storagetGetInfo();
  };

  get login() {
    return this.loginSignUp.get('login')
  };

  get password(){
    return this.loginSignUp.get('password')
  };

  storagetGetInfo() {
    const arr = this.storage.get('userInfo');
    if(arr) {
      this.arrList = JSON.parse(arr)
    }
  };

  getCurrentUser():any {
    const currentUser = this.arrList.filter(val=>{
      return (this.Password === val.Password &&  this.Login === val.Email)
    });
    return currentUser
  };
  
  compareLogin() { 
     const currentUser = this.getCurrentUser();
     if(currentUser.length !== 0){
      this.authService.setUser(currentUser)     
      console.log('this password found');
      this.router.navigateByUrl('/canvas') 
     } else {
       alert('you need registration')
     }
  };
  
  loginBtn() {
    this.storagetGetInfo()
    this.compareLogin()
  }

}
