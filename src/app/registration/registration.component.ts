import { Component, OnInit, OnChanges} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmValidator } from 'src/ConfirmPassCustomValidation/confirmPassCustom.Validator';
import { LocalStorageService } from '../services/storage.service';
import { RegistrationObj } from './registrationClass';
import { registrationList } from '../interfaces/registration.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private fb:FormBuilder, private storage: LocalStorageService,
   private router: Router) { }
  registrationForm!:any;
  fName:string = '' ;
  lName:string = '' ;
  Email:string = '' ;
  Password:any = '';
  objRegistration!:registrationList ;
  arrRegistration:registrationList[] = [];
  

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,  Validators.minLength(3)]], 
      confirmPassword: ['', Validators.required]
    },{validator: confirmValidator('password', 'confirmPassword')});

    this.storagetGetInfo()
  };

  get firstName() {
    return this.registrationForm.get('firstName')
  };

  get lastName() {
    return this.registrationForm.get('lastName')
  };

  get email() {
    return this.registrationForm.get('email')
  };

  get password() {
    return this.registrationForm.get('password')
  };

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  };

  creatObj() {
    if(this.Email || this.Password) {
      const creatObj = new RegistrationObj(this.fName, this.lName, this.Email, this.Password)
      this.arrRegistration.push(creatObj)
    }
  };

  storageSetInfo() {
    if(this.Email || this.Password) {
      const jsonObj = JSON.stringify(this.arrRegistration);
      this.storage.set('userInfo', jsonObj)
    }
  };

  storagetGetInfo() {
    let arrjson = this.storage.get('userInfo')
    if(arrjson) {
      this.arrRegistration = JSON.parse(arrjson)
    }
  };

  submitBtn() {
    this.creatObj();
    this.storageSetInfo();
    if(this.fName && this.lName && this.email && this.password && this.confirmPassword) {
      this.router.navigateByUrl('/login'); 
    }
  }


  
}
