import { Component, OnInit } from '@angular/core';
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
//import { Router, Routes } from "@angular/router";
import { UserserviceService } from '../users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  logindata = { 'username': '', password: '' }
  model = { username: '', email: '', mobile: '', password: '', conf_password: '' }
  name: any;
  msg;
  password_status = false;
  tabaledata: any ;
  loginForm: FormGroup;
  REG_FORM: FormGroup;
  REG_FORM1: FormGroup;
  REG_UPDATE_FORM: FormGroup;
  loginForm1: FormGroup;
  formData: FormData;
  hide = true;
  nvipani = false;
  normal_form = true;
  test;
  emailerror = false;
  loading: boolean;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  delete_Data;
  disable_Data;
  reset_Data;
  constructor(public fb: FormBuilder, public US: UsersService, private toastr: ToastrService, private UPS: UploadService) { }


  ngOnInit() {
    this.US.userlogin = false;
    console.log(this.logindata.username);
    this.REG_FORM = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conf_password: ['', [Validators.required]],
    })
    this.REG_UPDATE_FORM = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]]
    })

    this.loginForm1 = this.fb.group({
      image: ['']
    })
    this.REG_FORM1 = this.fb.group({
      username: ['', Validators.required]
    })
    this.getNewUsers();
  }

  getNewUsers() {
    this.loading = true;
    this.US.getNewUsers().subscribe((res) => {
      console.log(res);
     
      if (res.data) {
        this.tabaledata = res.data;
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }

  getErrorMessage() {
    return this.REG_FORM.controls['username'].hasError('required') ? 'You must enter a naipani mail' :
      this.REG_FORM.controls['username'].hasError('username') ? 'Not a valid email' :
        '';
  }



  onSubmit() {
    console.log(this.REG_FORM.value);
    if (this.REG_FORM.value.password.length <= 6) {
      this.REG_FORM.patchValue({
        password: '',
        conf_password: ''
      })
      this.toastr.warning('Password Must be greater than 6 Character', 'Error');
    }
    if (this.REG_FORM.value.password === this.REG_FORM.value.conf_password && this.REG_FORM.value.password != '' && this.REG_FORM.value.conf_password != '') {
      console.log('if case');
      this.US.register(this.REG_FORM.value).subscribe((res) => {
        console.log(res.data);
        if (res.success) {
          this.toastr.success('Registerd Successfully!', 'Thank you!');
          this.getNewUsers();
          // this.router.navigate(['login']);
        } else {
          this.US.userlogin = res.success;
          this.toastr.warning('Email Already Existed', 'Error');
        }
      });
    } else {
      console.log('esse case');
      this.model.conf_password = '';
      this.toastr.warning('Password and Confirm Password Must be Same', 'Error');
    }
  }

  register() {
    console.log('ts');
    this.REG_FORM.reset();
  }

  edit(t) {
    this.REG_UPDATE_FORM.patchValue(t);
  }

  imagepriview: any;
  onChange(event) {

    const value = (event.target as HTMLInputElement).files[0];
    const files = event.srcElement.files;
    // this.loginForm1.patchValue({
    //   image:value
    // })
    this.loginForm1.get('image').updateValueAndValidity();
    console.log(this.loginForm1.value);
    console.log((event.target as HTMLInputElement).files[0])
    let reader = new FileReader();
    reader.onload = () => {
      this.imagepriview = reader.result
    }

    reader.readAsDataURL(value);

    this.UPS.makeFileRequest('http://localhost:8081/fileupload', files, { 'token': localStorage.getItem('token') }).subscribe(
      (Res) => {
        console.log(Res);

      }
    )

  }
  // --- NVIPANI FUNCTIONS


  nvi_register() {
    this.nvipani = true;
  }
  back() {
    this.nvipani = false;
  }

  onSearchChange(value) {
    var trigger = value,
    regexp = new RegExp('@nvipani.com');
    this.test = regexp.test(trigger);
    if (!this.REG_FORM1.valid || !this.test) {
      this.emailerror = true;
    } else {
      this.emailerror = false;
    }
  }

  nvi_onSubmit() {
    //  console.log(this.REG_FORM1.value);
    let body = {};
    body = Object.assign({}, this.REG_FORM1.value, { issendotp: true, issendemail: true });
    this.US.regViaemail(body).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Registration Requst Sent to -' + `${this.REG_FORM1.value.username}`, 'Thank you!');
        this.getNewUsers();
        this.nvipani = false;
      }
    })
  }

  

  // sendPasswordLinkd() {
  //   if (this.reset_pwd_Data != null && Object.keys(this.reset_pwd_Data).length > 0) {
  //     this.US.sendPasswordLink(this.reset_pwd_Data).subscribe((res) => {
  //       if (res.status) {
  //         this.toastr.success('Registration Requst Sent to -' + `${this.reset_pwd_Data['username']}`, 'Thank you!');
  //         this.reset_pwd_Data = {};
  //       } else {
  //         this.toastr.warning('Registration Requst Sent ', 'Error!');
  //       }
  //     })
  //   } else {
  //     this.toastr.warning('Please check once', 'error!');
  //   }
  // }

  delete(t) {
    this.US.delete_User(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        // this.router.navigate(['login']);
        this.getNewUsers();
        this.delete_Data='';
      } else {
        this.US.userlogin = res.success;
        this.toastr.warning('Unable to delete', 'Error');
      }
    });
  }
  delete_popup(t) {
    console.log(t);
    this.delete_Data = t;
  }
  disable(t) {
    this.US.disable_User(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Disabled!', 'Thank you!');
        // this.router.navigate(['login']);
        this.getNewUsers();
        this.disable_Data='';
      } else {
        this.toastr.warning('Unable to Disable', 'Error');
      }
    });
  }
  disable_popup(t) {
    console.log(t);
    this.disable_Data = t;
  }
  
  reset_popup(t) {
    console.log(t);
    this.reset_Data = t;
  }

  reset_pwd_Data: object;
  resetPassword(t) {
    this.reset_pwd_Data = {
      id: this.tabaledata[this.tabaledata.indexOf(t)]._id,
      reset_password: this.tabaledata[this.tabaledata.indexOf(t)].reset_password,
      username: this.tabaledata[this.tabaledata.indexOf(t)].email
    }

    if (this.reset_pwd_Data != null && Object.keys(this.reset_pwd_Data).length > 0) {
      this.US.sendPasswordLink(this.reset_pwd_Data).subscribe((res) => {
        if (res.status) {
          this.toastr.success('Password Reset Requst Sent to -' + `${this.reset_pwd_Data['username']}`, 'Thank you!');
          this.reset_pwd_Data = {};
        } else {
          this.toastr.warning('Password Reset Requst Sent ', 'Error!');
        }
      })
    } else {
      this.toastr.warning('Please check once', 'error!');
    }
  }
} 