import { Component, OnInit } from '@angular/core';
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
//import { Router, Routes } from "@angular/router";
import { UserserviceService } from '../adminusers/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { UsersService } from '../users.service';
import { ProfileService } from '../profile/profile.service';
import { speedDialFabAnimations } from './fab-animations';
import { Command } from 'protractor';
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: speedDialFabAnimations
})
export class UsersComponent implements OnInit {
  profile: FormGroup;
  REG_FORM1: FormGroup;
  loginForm1: FormGroup;
  formData: FormData;

  hide = true;
  nvipani = false;
  update_status = false;
  normal_form = true;
  test;
  emailerror = false;
  loading: boolean;

  //TABLE DATA
  tabaledata: any;
  tabledata: any;
  //Table Data end

  //Table Sorting
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  //Table Sorting End

  //For POP UPS DATA
  delete_Data;
  disable_Data;
  reset_Data;
  usertype;
  type: string = null;
  //For POP UPS DATA


  //FAB BUTTONS 
  fabButtons = [
    {
      icon: 'create',
      edit:(param)=>{this.edit_visible(param)}, 
      tooltip:"Delete User"},
    {
      icon: 'delete_outline',
      edit:(param)=>{this.delete_popup(param)},
      tooltip:"Delete User"
    },
    {
      icon: 'person_add_disabled',
      edit:(param,type)=>{this.disable_popup((param),type)}, 
      tooltip:"Disable User",
    },
    {
      icon: 'person',
      edit:(param,type)=>{this.disable_popup((param),type)}, 
      tooltip:"Enable User",
    },
    {
      icon: 'lightbulb_outline',
      edit:(param)=>{this.edit_visible(param)}, 
      tooltip:"Delete User",
    },
    {
      icon: 'lock',
      edit:(param)=>{this.edit_visible(param)}, 
      tooltip:"Delete User",
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  //FAB Buttons end

  constructor(public fb: FormBuilder, public US: UsersService, private toastr: ToastrService,
    private UPS: UploadService, public PS: ProfileService, ) {
    this.usertype = localStorage.getItem('usertype');
  }


  ngOnInit() {
    this.US.userlogin = false;
    this.loginForm1 = this.fb.group({
      image: ['']
    })
    this.REG_FORM1 = this.fb.group({
      username: ['', Validators.required]
    })
    this.profile = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      mobile: []
    })
    this.getNewUsers();
  }

  getNewUsers() {
    this.loading = true;
    this.US.getNewUsers().subscribe((res) => {
      console.log(res);
      if (res.data) {
        this.tabledata = res.data;
        this.tabaledata = res.data;
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }

  getErrorMessage() {
    return this.REG_FORM1.controls['username'].hasError('required') ? 'You must enter a nvipani mail' :
      this.REG_FORM1.controls['username'].hasError('username') ? 'Not a valid email' :
        '';
  }

  updated_by: any = '';
  edit_visible(value:any='') {
    console.log(value,'test');

    this.update_status = true;
    this.profile.patchValue(value)
    this.updated_by = value.username
  }

  updatePrfile() {
    let body = {}
    body = Object.assign({}, this.profile.value, { username: this.updated_by });
    console.log(body);

    this.PS.updateProfile(body).subscribe((res) => {
      if (res) {
        this.update_status = !this.update_status;
        this.getNewUsers();
        this.updated_by = '';
        this.toastr.success('User Updated Successfully', 'success')
      } else {
        this.toastr.warning('Error in Updating User', 'error')
      }
    })
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

  delete(t) {
    this.US.delete_User(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        this.getNewUsers();
        this.delete_Data = '';
      } else {
        this.US.userlogin = res.success;
        this.toastr.warning('Unable to delete', 'Error');
      }
    });
  }
  delete_popup(t) {
    console.log(t,'delete');
    document.getElementById('delete').click();
    this.delete_Data = t;
  }
  disable(t) {
    if (this.type != null) {
      this.US.disable_User(t._id, this.type).subscribe((res) => {
        console.log(res.data);
        if (res.status) {
          this.toastr.error('Successfully ' + `${this.type}d`, 'Thank you!');
          this.getNewUsers();
          this.disable_Data = '';
        } else {
          this.toastr.warning('Unable to ' + `${this.type}d`, 'Error');
        }
      });
    }
  }

  disable_popup(t, type) {
    this.type = type;
    this.disable_Data = t;
  }

  reset_popup(t) {
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

  s_buttons:boolean=false;
  filterUsers(type: string) {
    (type === 'allusers') ? this.tabaledata = this.tabledata : this.tabaledata = this.tabaledata.filter(item => item.userType === type);
  }

  //fAB BUTTONS RELATED FUNC
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }
index:number;
prev:number=0;  
onToggleFab(index) {
    console.log('called',this.prev,index);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
    this.index =index;
    // if(this.prev == 0 ){
    //     this.prev == index;
         
    //       if(this.prev == this.index){
    //         console.log('this is the case');
           
    //       }else{
    //         this.prev = this.index;
    //       }
         
    // }else{
    //   if(this.prev == this.index){
    //     console.log('this is the case1');
        
    //     this.showItems();
    //   }else{
    //     this.prev = this.index;
    //   }
    // }
     
    // this.s_buttons = !this.s_buttons;
    // (this.tabaledata.indexOf(item) === index)?this.fabTogglerState ='active':this.fabTogglerState = 'inactive';
        this.buttons.length ? this.hideItems() : this.showItems();
  }
  
temp;
  changeStyle($event){
     
     
    
    this.temp= $event.type == 'mouseover' ? 'yellow' : 'red';
  }
   //fAB BUTTONS RELATED FUNC
} 