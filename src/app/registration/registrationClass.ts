import { registrationList } from "../interfaces/registration.interface";
export class RegistrationObj implements registrationList {
    fName;
    lName;
    Email
    Password;
    constructor(fName:string, lName:string, Email:string, Password:any) {
        this.fName = fName;
        this.lName = lName;
        this.Email = Email;
        this.Password = Password
    }
}