import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';
import { TaxGroupService } from 'src/app/taxgroups/tax-group.service';
@Component({
  selector: 'app-taxgroups',
  templateUrl: './taxgroups.component.html',
  styleUrls: ['./taxgroups.component.css']
})
export class TaxgroupsComponent implements OnInit {
  TAX_FORM: FormGroup;
  loading: boolean;
  tabaledata: any = [];
  tgUpdateId=''; 
  nvipani=false;
  disable_Data;
  public filterQuery = '';
  public rowsOnPage = 20;
  public sortBy = '';
  public sortOrder = 'desc';
  constructor(private TGS: TaxGroupService, private FB: FormBuilder, public toastr: ToastrService) { }

  ngOnInit() {
    this.get_TaxGroups()
    this.TAX_FORM = this.FB.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      CGST: ['',Validators.required],
      SGST: ['',Validators.required],
      IGST: ['',Validators.required],
      cess: [''],
    });
    
  }

  resetForm(){
    this.tgUpdateId = ''; 
    this.TAX_FORM.reset()
  }
  get_TaxGroups() {
    this.loading = true;
    this.TGS.get_taxGroups().subscribe((res) => {
      console.log(res.length);
      if (res.length>0) {
        this.tabaledata = res;
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }


  addTaxGroups() {
    // console.log(this.TAX_FORM.value);
    if (this.tgUpdateId != '') {
      this.UpdateHsn()
    } else {
     let body = Object.assign({},this.TAX_FORM.value,{user:localStorage.getItem('name')})
      console.log(body);
      
      this.TGS.addTaxGroup(body).subscribe((res) => {
        if (res.status) {
          this.tgUpdateId = '';
          this.get_TaxGroups();
          this.toastr.success(res.messagge, 'success');
        } else {

        }
      })
    }

  }

  editTGroup(t) {
    console.log(t);
    this.tgUpdateId = t._id
    this.TAX_FORM.patchValue(t)
  }

  UpdateHsn() {
    let body = Object.assign({}, this.TAX_FORM.value, { _id: this.tgUpdateId })
    this.TGS.updateTaxGroup(body).subscribe((res) => {
      if (res._id) {
        this.tgUpdateId = '';
        this.get_TaxGroups();
        this.toastr.success(res.messagge, 'success');
      } else {
        this.toastr.warning(res.messagge, 'Error');
      }
    })
  }

  delete_Data;
  delete(t) {
    this.TGS.delete_TaxGroup(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        // this.router.navigate(['login']);
        this.get_TaxGroups();
        this.delete_Data = '';
      } else {
        this.toastr.warning('Unable to delete', 'Error');
      }
    });
  }
  delete_popup(t) {
    console.log(t);
    this.delete_Data = t;
  }


}
