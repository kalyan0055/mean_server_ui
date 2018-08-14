import { Injectable, COMPILER_OPTIONS } from '@angular/core';
import { UserserviceService } from "../users/userservice.service";
import { Url } from "../common/url";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private US:UserserviceService) { }

  login(value){
    ///users/login
    //auth/signin
  return this.US.callApi('http://localhost:8081/auth/signin','post',value);
  }
  
  confirmRegistration(value){
    return this.US.callApi('http://localhost:8081/user/sendpresignupotp','post',value);
  }
  resetPassword(value){
    return this.US.callApi(Url.API.RESET_PASSWORD,'post',value);
  }
}
