import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
matchLogin:boolean = true ;
// registrationDone = true

disapaierLoginPage(val:boolean) {
  this.matchLogin = val
};

disapaierRegistrationPage(val:boolean) {
  this.matchLogin = val
};


}
