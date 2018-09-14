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
import { UserserviceService } from "../adminusers/userservice.service";
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
  loading1=false;
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
  otp: number;
  ngOnInit() {
     
    localStorage.clear();
    this.sub = this.route.params.subscribe(params => {
      this.username = params.id1// (+) converts string 'id' to a number
      this.otp = params.id2
      this.location.replaceState('reset');
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  register() {
    this.router.navigate(['userlogin'])
  }
  onSubmit() {
    let body = {
      username: this.username,
      newPassword: this.registrationFormGroup.value.passwordFormGroup.password,
      verifyPassword: this.registrationFormGroup.value.passwordFormGroup.repeatPassword,
      otp: this.otp
    }
    this.loading1=true;
    this.Auth.resetPassword(body).subscribe((res) => {
        if (res.status) {
        this.loading1= false;
        let msg = res.message;
        this.toaster.success(msg, 'Success');
        localStorage.clear();
        this.router.navigate(['']);
      } else {
      setTimeout(() => {
        this.loading1= false;
        this.toaster.error(res.message, 'Errodr');
      }, 2000);
        
      }
    })
  }


}