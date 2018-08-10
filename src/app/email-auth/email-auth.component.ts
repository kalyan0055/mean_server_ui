// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-email-auth',
//   templateUrl: './email-auth.component.html',
//   styleUrls: ['./email-auth.component.css']
// })
// export class EmailAuthComponent implements OnInit {

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
  selector: 'app-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.css']
})
export class EmailAuthComponent implements OnInit, OnDestroy {
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
      this.id = params.id1// (+) converts string 'id' to a number
      this.username =params.id2;
      this.otp = params.id3
      console.log(atob(params.id2));
      // Decode the String
 
      this.location.replaceState('authd');
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
      password: this.registrationFormGroup.value.passwordFormGroup.password,
      conf_password: this.registrationFormGroup.value.passwordFormGroup.repeatPassword,
      isverifyotp: true,
      otp:this.otp
    }
    this.Auth.confirmRegistration(body).subscribe((res) => {
      if (res.success) {
        console.log(res.token, 'tttttttttttttt');

        let msg = 'Welcome -' + (res.data.username).toUpperCase();
        this.US.userlogin = true;
        localStorage.setItem('name', res.data.username)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('token', res.token)
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
