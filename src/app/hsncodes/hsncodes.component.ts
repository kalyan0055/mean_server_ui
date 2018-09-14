 
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";
import { HsnService } from "../hsncodes/hsn.service";
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '../../../node_modules/angular-6-datatable';
import {UomService} from '../unitofmeasuers/uom.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-hsncodes',
  templateUrl: './hsncodes.component.html',
  styleUrls: ['./hsncodes.component.css']
})
export class HsncodesComponent implements OnInit {
  loading: boolean;
  tabaledata1;
  UOM_FORM: FormGroup;
  public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  types: any = [{ 'type': 'Simple' }, { 'type': 'Compound' }];
  totalposts:number;
  pageSize=100;
  currentpage=1;
  nvipani=false;
  disable_Data;
  reset_Data;
  //angular2-multiselect
    itemList = [];
  hsnUpdateId:string='';
  //

  uomData:any=[];

 
              
  constructor(private US: UsersService, private fb: FormBuilder, private HSN: HsnService,
    private UOM:UomService, private toastr: ToastrService, ) { }


  ngOnInit() {
    // this.getNewUsers();
    this.get_uoms();
    this.get_hsns(this.pageSize,this.currentpage);
    this.UOM_FORM = this.fb.group({
      name: [''],
      chapterCode:[''],
      chapterDescription: [''],
      headingCode: [''],
      headingDescription: [''],
      hsncode: [''],
      description: [''],
      unitOfMeasure: ['']
    })
  }

  get_hsns(pageSize:number,currentpage:number) {
    this.loading = true;
    this.HSN.get_hsns(this.pageSize,this.currentpage).subscribe((res) => {
      console.log(res.count);
      this.tabaledata1 = res.hsncodes;
      this.totalposts = res.count;
      if (res) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }
 
  onChnagepage(pageData:PageEvent){
    this.currentpage = pageData['pageIndex']+1;
    this.pageSize = pageData['pageSize'];
    console.log(this.currentpage,this.pageSize);
    this.get_hsns(this.pageSize,this.currentpage);
  }


  get_uoms() {
    this.loading = true;
    this.UOM.get_uoms().subscribe((res) => {
      console.log(res);
      if (res) {
        this.itemList = res;
        this.loading = false;
      } else {
        this.itemList = [];
        this.loading = true;
      }
    })
  }

  addHsn(){
    console.log(this.UOM_FORM.value);
    if(this.hsnUpdateId!=''){
      this.UpdateHsn()
    }else{
      this.HSN.addHSN(this.UOM_FORM.value).subscribe((res)=>{
        if(res.status){
            this.hsnUpdateId='';
            this.get_hsns(this.pageSize,this.currentpage);
            this.toastr.success(res.messagge,'success');
        }else{

        }
      })
    }
     
  }

  editHSN(t){
    console.log(t);
    this.hsnUpdateId= t._id
    this.UOM_FORM.patchValue(t)
  }

  UpdateHsn(){
    let body = Object.assign({},this.UOM_FORM.value,{_id:this.hsnUpdateId})
    this.HSN.updateHSN(body).subscribe((res)=>{
      if(res.status){
          this.hsnUpdateId='';
          this.get_hsns(this.pageSize,this.currentpage);
          this.toastr.success(res.messagge,'success');
      }else{
          this.toastr.warning(res.messagge,'Error');
      }
    }) 
  }

  delete_Data;
  delete(t) {
    this.HSN.delete_HSN(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        // this.router.navigate(['login']);
        this.get_hsns(this.pageSize,this.currentpage);
        this.delete_Data='';
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
