import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";
import { UomService } from "../unitofmeasuers/uom.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-unitofmeasuers',
  templateUrl: './unitofmeasuers.component.html',
  styleUrls: ['./unitofmeasuers.component.css']
})
export class UnitofmeasuersComponent implements OnInit {
  loading: boolean;
  tabaledata1;
  UOM_FORM: FormGroup;
  nvipani=false;
  public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  types: any = [{ 'type': 'Simple' }, { 'type': 'Compound' }];
  delete_Data;
  reset_Data;
  disable_Data;
  constructor(private US: UsersService, private fb: FormBuilder, private UOM: UomService, private toastr: ToastrService, ) { }

  ngOnInit() {
    // this.getNewUsers();
    this.get_uoms();
    this.UOM_FORM = this.fb.group({
      name: [''],
      symbol: [''],
      uqcCode: [''],
      description: [''],
      quantityType: [''],
      type: ['']
    })
  }

  get_uoms() {
    this.loading = true;
    this.UOM.get_uoms().subscribe((res) => {
      console.log(res);
      this.tabaledata1 = res;
      if (res) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }



  onSubmit() {
    console.log(this.UOM_FORM.value);
    this.UOM.create_uom(this.UOM_FORM.value).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Successfully Added!', 'Thank you!');
        // this.router.navigate(['login']);
        this.get_uoms();
      } else {
        this.toastr.warning('Unable to Added', 'Error');
      }
    })

  }

  //   numberOfDecimalPlaces: {
  //     type: Number,
  //     default: 0
  // },
  // conversion: {
  //     type: Number,
  //     default: 0
  // },
  // firstUnitOfMeasure: {
  //     type: Schema.ObjectId,
  //     ref: 'UnitOfMeasure'
  // },
  // secondUnitOfMeasure: {
  //     type: Schema.ObjectId,
  //     ref: 'UnitOfMeasure'
  // },
}
