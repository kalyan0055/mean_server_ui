import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { UsersService } from '../users.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datatable=[];
  constructor(public CS:CommonService,public US:UsersService) {
    console.log('tets');
    
    //  this.getUI_Settings();
   }

  ngOnInit() {
    
  }

   getUI_Settings(){
     this.US.getUI_Settings().subscribe((res) => {
      let data = res.data.filter(item => item.deleted === false);
      let s = _.where(data, { ui_table: "USERS" });
      if(s.length > 0){
        let t = s[0]['records_per_page'];
        var array = JSON.parse("[" + t+ "]");
        this.datatable = [];
        this.US.datatable =[];
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          this.datatable.push(element)
          this.US.datatable.push(element)  
        }
        
         localStorage.setItem('datatable', JSON.stringify(this.datatable));
      }
      

     })
  }
}
