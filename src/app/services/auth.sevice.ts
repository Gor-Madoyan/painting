import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: LocalStorageService) { }

  getUser() {
      return JSON.parse(`${this.storage.get('user')}`)
  }

  setUser(currentUser: any) {
     this.storage.set('currentUser', JSON.stringify(currentUser[0]))
}

}
 