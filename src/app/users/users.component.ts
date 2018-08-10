import { Component, OnInit } from '@angular/core';
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn  
} from '@angular/forms';
//import { Router, Routes } from "@angular/router";
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';

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
  tabaledata:any=[]
  loginForm: FormGroup;
  REG_FORM:FormGroup;
  REG_FORM1:FormGroup;
  REG_UPDATE_FORM:FormGroup;
  loginForm1 : FormGroup;
  formData:FormData;
  hide=true;
  nvipani= false;
  normal_form = true;
  test;
  emailerror=false;
   loading:boolean;
   public filterQuery = '';
   public rowsOnPage = 20;
   public sortBy = '';
   public sortOrder = 'desc';
  constructor(public fb: FormBuilder,   public US: UsersService,private toastr: ToastrService,private UPS:UploadService ) { }
   

  ngOnInit() {
    this.US.userlogin=false;
    console.log(this.logindata.username);
    this.REG_FORM = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(11)]],
      email: ['',[Validators.required, Validators.email]],
      mobile: ['',[Validators.required]],
      password: ['',[Validators.required]],
      conf_password: ['',[Validators.required]],

    })
    this.REG_UPDATE_FORM = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(11)]],
      email: ['',[Validators.required, Validators.email]],
      mobile: ['',[Validators.required]]
    })

    this.loginForm1 = this.fb.group({
      image:['']
    })
    this.REG_FORM1 = this.fb.group({
      username:['',Validators.required]
    })
    this.getNewUsers();
  }

  getNewUsers(){
    this.loading = true;
    this.US.getNewUsers().subscribe((res)=>{
      console.log(res);
       this.tabaledata = res.data;
       if(res.data){
        this.loading = false;
       }else{
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
    if(this.REG_FORM.value.password.length <= 6){
      this.REG_FORM.patchValue({
        password:'',
        conf_password:''
      })
      this.toastr.warning('Password Must be greater than 6 Character','Error');
    }
    if (this.REG_FORM.value.password === this.REG_FORM.value.conf_password && this.REG_FORM.value.password !='' && this.REG_FORM.value.conf_password !='') {
      console.log('if case');
      this.US.register(this.REG_FORM.value).subscribe((res) => {
        console.log(res.data);
        if (res.success) {
          this.toastr.success('Registerd Successfully!', 'Thank you!');
          this.getNewUsers();
        // this.router.navigate(['login']);
        } else {
          this.US.userlogin = res.success;
          this.toastr.warning('Email Already Existed','Error');
        }
      });
    } else {
      console.log('esse case');
      this.model.conf_password = '';
      this.toastr.warning('Password and Confirm Password Must be Same','Error');
    }
  }

  register(){
    console.log('ts');
   this.REG_FORM.reset();
  }
  
  edit(t)
  {
     this.REG_UPDATE_FORM.patchValue(t);
  }
  delete(t)
  {
    this.US.delete_User(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.success) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
      // this.router.navigate(['login']);
      this.getNewUsers();
      } else {
        this.US.userlogin = res.success;
        this.toastr.warning('Unable to delete','Error');
      }
    });
  }

  imagepriview:any;
  onChange(event){
 
    const value =(event.target as HTMLInputElement).files[0];
    const files = event.srcElement.files;
    // this.loginForm1.patchValue({
    //   image:value
    // })
    this.loginForm1.get('image').updateValueAndValidity();
    console.log(this.loginForm1.value);
    console.log((event.target as HTMLInputElement).files[0])
    let reader = new FileReader();
    reader.onload = () =>{
      this.imagepriview = reader.result
    }
   
    reader.readAsDataURL(value);
    
    this.UPS.makeFileRequest('http://localhost:8081/fileupload',files,{'token':localStorage.getItem('token')}).subscribe(
      (Res)=>{
        console.log(Res);
        
      }
    )
  

  }
 // --- NVIPANI FUNCTIONS
  

 nvi_register(){
   this.nvipani= true;
 }
 back(){
   this.nvipani = false;
 }

 onSearchChange(value){
  
  var trigger = value,
  regexp = new RegExp('@nvipani.com');
  this.test = regexp.test(trigger);
  console.log(this.test);
  if(!this.REG_FORM1.valid || !this.test){
    this.emailerror = true;
  }else{
    this.emailerror = false;
  }
  
 // will display true
}
 nvi_onSubmit(){
  //  console.log(this.REG_FORM1.value);
  let body = {};
  body = Object.assign({},this.REG_FORM1.value,{issendotp:true,issendemail:true});
  console.log(body);
  
   this.US.regViaemail(body).subscribe((res)=>{
    console.log(res);
  })
 }
} 