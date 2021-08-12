import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../services/storage.service';
import { registrationList } from '../interfaces/registration.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storage: LocalStorageService,private fb:FormBuilder ) { }

  @Output() newItemEvent  = new EventEmitter();

  arrList:Array<registrationList> = [];
  usersAccountsArr:any = []
  Password:any = '';
  Login:string = ''
  loginSignUp!:any
  passwordMatch!:boolean 

  addNewItem(passMatch:boolean) {
    this.newItemEvent.emit(passMatch)
  };

 
  ngOnInit(): void {
    this.loginSignUp = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
      this.storagetGetInfo();
      this.enterUserAccount()
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
      // console.log(this.arrList, 'storageGetInfo arrList');
    }
  };
  
  enterUserAccount() {
    let usersAccounts = this.storage.get('userAccounts');
    if(usersAccounts) {
      this.usersAccountsArr = JSON.parse(usersAccounts);
      // console.log(this.usersAccountsArr, 'enter usersArr')
    }
  };


  compareLogin() {
    // debugger
    this.enterUserAccount()
    this.arrList.forEach((val, i)=>{
      if(this.Password === val.Password &&  this.Login === val.Email) {
        console.log('this password found');
        
        // canvas.projectList = this.usersAccountsArr[i]
        // let passMatch = this.passwordMatch = false
        this.addNewItem(false)    
      }
    })
  };

  loginBtn() {
    // debugger  
    this.storagetGetInfo()
    this.compareLogin()
    
    // console.log(this.arrList, 'btn arrList')
    // this.storage.removeAll()
  }

}
