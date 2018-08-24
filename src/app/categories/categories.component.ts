// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })
// export class CategoriesComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { UsersService } from '../users.service';
import { MCategoryService } from './m-category.service';
import { Url } from '../common/url';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
   
 
  url = environment.url;
  tabaledata: any ;
  main_category: FormGroup;
 
  nvipani = false;
  
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
  usertype;
  constructor(public fb: FormBuilder, public US: UsersService, 
    private toastr: ToastrService, private UPS: UploadService,private MCS:MCategoryService) { 
    this.usertype = localStorage.getItem('usertype');
  }


  ngOnInit() {
    this.US.userlogin = false;
    this.main_category = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      type: ['', Validators.required],
      file: ['', Validators.required]

    });
    
    this.MainCategoriesList();
  }

  MainCategoriesList() {
    this.loading = true;
    this.MCS.MainCategoriesList().subscribe((res) => {
     
      console.log( res.filter(item=>item.type ==='MainCategory'));
      
     if(res.length > 0) {
        this.tabaledata = res.filter(item=>item.type ==='MainCategory');
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }

  getErrorMessage(type1) {
    console.log(type1);
    
    if(type1){
      return this.main_category.controls[type1].hasError('required') ? 'You must enter alphabets only' :
      this.main_category.controls[type1].hasError(type1) ? 'Not a valid Name' :''; 
    }
    }

  

  
  // --- NVIPANI FUNCTIONS

 
  nvi_onSubmit() {
    //  console.log(this.main_category.value);
    let body = {};
    body = { name: this.main_category.value.name,
             code :this.main_category.value.name,
            type :this.main_category.value.type };
     if(body){
      this.fileupload(body);
    }
  }

  imagepriview: any;
  files;
  onChange(event) {
    const value = (event.target as HTMLInputElement).files[0];
    this.files = event.srcElement.files;
    this.main_category.get('file').updateValueAndValidity();
    let reader = new FileReader();
    reader.onload = () => {
      this.imagepriview = reader.result
    }
    reader.readAsDataURL(value);
  }

  fileupload(body) {
    this.UPS.mCategoryUpload(Url.API.CREATE_MAIN_CATEGORY, this.files,body).subscribe(
      (Res) => {
        let data = JSON.parse(Res);
        this.toastr.success(`${this.main_category.value.name}` + 'Created Successfully', 'Thank you!');
        this.MainCategoriesList();
        this.nvipani = false;     
        
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
        this.MainCategoriesList();
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
        this.MainCategoriesList();
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

  
} 
