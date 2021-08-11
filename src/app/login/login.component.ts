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
  passwordMatch:boolean = true

  addNewItem() {
    this.newItemEvent.emit(this.passwordMatch)
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
    let arrPars = JSON.parse(`${arr}`)
    this.arrList = arrPars
  };

  compareLogin() {
    // let canvas = new CanvasComponent(this.storage)
    this.arrList.forEach(val=>{
      if(this.Password == val.Password && this.Login === val.Email 
        && this.Login === this.usersAccountsArr.email) {
        console.log('this password found');
        
        // canvas.projectList = this.usersAccountsArr
        this.passwordMatch = !true
        
      }
    })
  };


  enterUserAccount() {
    let usersAccounts = this.storage.get('userAccounts');
    this.usersAccountsArr = JSON.parse(`${usersAccounts}`)
    console.log(this.usersAccountsArr);
    
  }

  loginBtn() {
    this.compareLogin()
    this.enterUserAccount()
    this.addNewItem()

    // console.log(this.arrList)
  }

}
