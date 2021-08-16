import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/storage.service';
import { registrationList } from '../interfaces/registration.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/Authentication.sevice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storage: LocalStorageService,private fb:FormBuilder , 
   private router:Router, private authService: AuthenticationService
    ) { }


  arrList:Array<registrationList> = [];
  Password:any = '';
  Login:string = ''
  loginSignUp:any;
  passwordMatch!:boolean ;
  loginMessage:boolean = false;

 

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
    return this.arrList.filter(val=>{
        return (this.Password === val.Password &&  this.Login === val.Email)
    });
    
  };
  
  compareLogin() { 
     const currentUser = this.getCurrentUser();
     if(currentUser.length !== 0){
      this.authService.setUser(currentUser)     
      console.log('this password found');
      this.router.navigateByUrl('/canvas') 
     } else {
       this.loginMessage = true
     }
  };
  
  
  loginBtn() {
    this.storagetGetInfo()
    this.compareLogin()
  }

}
