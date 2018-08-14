// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-resetpassword',
//   templateUrl: './resetpassword.component.html',
//   styleUrls: ['./resetpassword.component.css']
// })
// export class ResetpasswordComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { AuthenticationService } from "../common/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from "../users/userservice.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { RegistrationValidator } from '../common/password-validator';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  model: any = { password: '', confpassword: '' }
  name: any;
  msg;
  password_status = false;
  loginForm: FormGroup;
  id: any;
  private sub: any;
  hide = true;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private location: Location, private route: ActivatedRoute,
    public router: Router, public Auth: AuthenticationService,
    public toaster: ToastrService, public US: UserserviceService, private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
        validator: RegistrationValidator.validate.bind(this)
      });
    this.registrationFormGroup = this.formBuilder.group({
      passwordFormGroup: this.passwordFormGroup
    });
  }

  get password() {
    return this.passwordFormGroup.get('password');
  }

  username: any;
  otp:number;
  ngOnInit() {
    localStorage.clear();
    this.sub = this.route.params.subscribe(params => {
      this.username = params.id1// (+) converts string 'id' to a number
      this.otp = params.id2
      this.location.replaceState('reset');
      // Decode the String
 
     
      // In a real app: dispatch action to load the details here.
    });

  
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  register() {
    this.router.navigate(['userlogin'])
  }
  onSubmit() {
    console.log(this.registrationFormGroup.value.passwordFormGroup);
    let body = {
      username: this.username,
      newPassword: this.registrationFormGroup.value.passwordFormGroup.password,
      verifyPassword: this.registrationFormGroup.value.passwordFormGroup.repeatPassword,
      otp:this.otp
    } 
    this.Auth.resetPassword(body).subscribe((res) => {
      console.log(res,'oooooooooooooooo');
      
      if (res.status) {
        console.log(res.token, 'tttttttttttttt');
        let msg = 'Welcome -' + (res.data.username).toUpperCase();
        this.US.userlogin = true;
        this.US.userdata = res.data;
        this.toaster.success(msg, 'Success');
        this.router.navigate(['users']);
      } else {
        this.toaster.error(res.message, 'Error');
      }
    })
  }

  forgetpassword() {

  }
}