import { Injectable, COMPILER_OPTIONS } from '@angular/core';
import { UserserviceService } from "../users/userservice.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private US:UserserviceService) { }

  login(value){
  return this.US.callApi('http://localhost:8081/users/login','post',value);
  }
}
