import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { AuthenticationService } from "../common/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from "../adminusers/userservice.service";
import {UsersService} from '../users.service';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  model :any = { username:'' , password:'' }
  name: any;
  msg;
  password_status = false;
  loginForm: FormGroup;

  constructor(public router: Router,public Auth:AuthenticationService,public toaster: ToastrService,public US:UsersService) { }

  ngOnInit() {
    localStorage.clear()
  }
  register() {
    this.router.navigate(['userlogin'])
  }
  onSubmit(){
    console.log('tttttsfs');
    
    this.Auth.login(this.model).subscribe((res)=>{
      console.log(res);
      
      if(res.success || res.status){
        console.log(res.token,'tttttttttttttt');
        
        let  msg = 'Hi -'+ (res.data.username).substr(0, res.data.username.length - 12).toUpperCase();
        this.US.userlogin = true;
        localStorage.setItem('name',res.data.username)
        localStorage.setItem('email',res.data.email)
        localStorage.setItem('token',res.token)
        localStorage.setItem('profileImageURL',res.data.profileImageURL)
        localStorage.setItem('userid',res.data._id)
        localStorage.setItem('usertype',res.data.userType)
        this.US.userdata =  localStorage.setItem('userInfo',JSON.stringify({firstName:res.data.firstName,lastName:res.data.lastName,middleName:res.data.middleName,mobile:res.data.mobile}));
        this.US.userdata = res.data;
        this.toaster.success(msg,'Welcome');
        this.router.navigate(['users']);
      }
      else{
        this.toaster.error(res.message,'Error');
      }
    })
  }

  forgetpassword(){

  }

 
}
