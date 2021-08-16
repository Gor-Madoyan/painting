import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { ICircle } from '../interfaces/circle.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private storage: LocalStorageService) { }

    getUser() {
        const user = this.storage.get('currentUser')
        if(user) {
            return JSON.parse(user)
        }
    };

    setUser(currentUser: any) {
        this.storage.set('currentUser', JSON.stringify(currentUser[0]))
    };

    getcirclesProject():Array<any> {
        return JSON.parse(`${this.storage.get('circlesProject')}`)
    };

    getCurrentUser():any {
        const currentUser = this.storage.get("currentUser")
        if(currentUser) {
            return JSON.parse(currentUser)
        }
    }
}
 