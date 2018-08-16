// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-hsncodes',
//   templateUrl: './hsncodes.component.html',
//   styleUrls: ['./hsncodes.component.css']
// })
// export class HsncodesComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";
import { HsnService } from "../hsncodes/hsn.service";
import { ToastrService } from 'ngx-toastr';
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
  constructor(private US: UsersService, private fb: FormBuilder, private HSN: HsnService, private toastr: ToastrService, ) { }

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
    this.HSN.get_uoms().subscribe((res) => {
      console.log(res);
      this.tabaledata1 = res;
      if (res) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    })
  }
 


  // onSubmit() {
  //   console.log(this.UOM_FORM.value);
  //   this.HSN.create_uom(this.UOM_FORM.value).subscribe((res) => {
  //     if (res.status) {
  //       this.toastr.success('Successfully Added!', 'Thank you!');
  //      this.get_uoms();
  //     } else {
  //       this.toastr.warning('Unable to Added', 'Error');
  //     }
  //   })

  // }

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
