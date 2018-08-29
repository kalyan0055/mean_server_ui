
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { UsersService } from '../../users.service';
import { MCategoryService } from '../main-categories/m-category.service';
import { Url } from '../../common/url';
import { environment } from '../../../environments/environment';
import { SubCategoryService } from "../sub-categories/sub-category.service";
import * as _ from 'underscore';

@Component({
  selector: 'app-subcategoires',
  templateUrl: './subcategoires.component.html',
  styleUrls: ['./subcategoires.component.css']
})
export class SubcategoiresComponent implements OnInit {



  url = environment.url;
  tabaledata: any;
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
  updateId = null;
  checked2: boolean = false;
  dropDownData: any;
  imagepriview: any;
  files;
  constructor(public fb: FormBuilder, public US: UsersService,
    private toastr: ToastrService, private UPS: UploadService, private SCS: SubCategoryService,
    private MCS: MCategoryService) {
    this.usertype = localStorage.getItem('usertype');
  }


  ngOnInit() {
    this.US.userlogin = false;
    this.main_category = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      type: ['', Validators.required],
      file: [''],
      parent: ['']

    });
    this.SubCategoriesList();
    this.MainCategoriesList();
  }


  SubCategoriesList() {
    this.loading = true;
    this.SCS.SubCategoriesList().subscribe((res) => {
      console.log(res.length, typeof res);
      if (res.length > 0) {
        this.tabaledata = res;
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }

  MainCategoriesList() {
    this.loading = true;
    this.MCS.MainCategoriesList().subscribe((res) => {
      console.log(res.length, typeof res);
      if (res.length > 0) {
        res.filter(item => item.disabled === false);
        res.forEach(element => {
          element['custome'] = element.name + '-' + element.code;
        });
        this.dropDownData = res
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }


  parentChange(event) {
    console.log('selected values', event.value);
  }


  // --- NVIPANI FUNCTIONS

  nvi_onSubmit() {
    //  console.log(this.main_category.value);
    let body = {};
    body = {
      name: this.main_category.value.name,
      code: this.main_category.value.code,
      type: this.main_category.value.type,
      parent: this.main_category.value.parent
    };
    if (body) {
      this.fileupload(body);
    }
  }

  
  onChange(event) {
  
    
    const value = (event.target as HTMLInputElement).files[0];
    this.files = event.srcElement.files;
    console.log(this.files);
    this.main_category.get('file').updateValueAndValidity();
    let reader = new FileReader();
    reader.onload = () => {
      this.imagepriview = reader.result
    }
    reader.readAsDataURL(value);
  }

  fileupload(body) {
    console.log(this.updateId);
    if (this.files) {
      if (this.updateId) {
        body._id = this.updateId;
        this.UPS.mCategoryUpdate(Url.API.UPDATE_MAIN_CATEGORY, this.files, body).subscribe(
          (Res) => {
            if (Res.status) {
              let msg = `${this.main_category.value.name}` + 'Updated Successfully';
              this.commonFunction('updated', msg);
            } else {
              this.commonFunction('error');
            }
          })
      } else {
        this.UPS.mCategoryUpload(Url.API.CREATE_MAIN_CATEGORY, this.files, body).subscribe(
          (Res) => {
            if (Res.status) {
              let msg = `${this.main_category.value.name}` + 'Created Successfully';
              this.commonFunction('updated', msg);
            } else {
              this.commonFunction('error');
            }
          })
      }
    } 
    else {
      this.SubmitwithoutFile(body);
    }
  }

  SubmitwithoutFile(body){
    if (this.updateId) {
      body._id = this.updateId;
      let msg = `${this.main_category.value.name}` + 'Updated Successfully';
      this.commonFunction('updated', msg);
      this.SCS.update_Sub_Categories(body).subscribe(
        (Res) => {
          if (Res.status) {
            let msg = `${this.main_category.value.name}` + 'Updated Successfully';
            this.commonFunction('updated', msg);
          } else {
            this.commonFunction('error');
          }
        })
    } else {
      this.SCS.create_Sub_Categories(body).subscribe(
        (Res) => {
          if (Res.status) {
            let msg = `${this.main_category.value.name}` + 'Created Successfully';
            this.commonFunction('updated', msg);
          } else {
            this.commonFunction('error');
          }
        })
    }
  }



  toasterMessages(type, msg) {
    switch (type) {
      case 'created': this.toastr.success(msg, 'Thank you!');
        break;
      case 'updated': this.toastr.success(msg, 'Thank you!');
        break;
      case 'error': this.toastr.error(msg, 'Error!');
        break;
      case 'deleted': this.toastr.error(msg, 'Success!');
        break;
      case 'disabled': this.toastr.info(msg, 'Success!');
        break;
      default:
        break;
    }

  }

  commonFunction(type: any = '', msg: any = '') {
    this.main_category.reset();
    this.toasterMessages(type, msg);
    this.SubCategoriesList();
    this.nvipani = false;
  }

  delete(t) {
    this.US.delete_User(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        let msg = 'Successfully Deleted!';
        this.delete_Data = '';
        this.commonFunction('deleted', msg);
      } else {
        this.commonFunction('error','Unable to delete')
      }
    });
  }

  delete_popup(t) {
    console.log(t);
    this.delete_Data = t;
  }
  disable(t) {
    if (this.type) {
      this.SCS.disable_MainCategory(t._id, this.type).subscribe((res) => {
        console.log(res.data);
        if (res.status) {
          this.disable_Data = '';
          this.commonFunction('disabled', `${t.name.toUpperCase()} Successfully Disabled`)
        } else {
          this.commonFunction('error', `${t.name} Unable to ${this.type}`)
        }
      });
    } else {
      this.commonFunction('error', `Disable or Enable Not Possible`)
    }
  }

  type: string = null;
  disable_popup(t, type) {
    console.log(t);
    this.type = type;
    this.disable_Data = t;
  }

edit(t) {
    console.log(t);
    this.main_category.patchValue(t);
    this.main_category.patchValue({ parent: t.parent._id })
    this.updateId = t._id;
    this.imagepriview = this.url + t.categoryImageURL1;
    this.nvipani = true;
  }

  viewData=null;
  view_popup(t) {
    console.log(t,t.length);
    
    this.viewData = t;
  }

}

