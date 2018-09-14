import { Component,  OnInit ,EventEmitter,Output,Input  } from '@angular/core';
import { UserserviceService } from "../../adminusers/userservice.service";
import {Router} from '@angular/router';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headername;
  usertype;
  @Output() selectedpage=new EventEmitter();
  constructor(public US:UserserviceService,private CS:CommonService, public router:Router) { }
  
  
  ngOnInit() {
    console.log(this.US.userdata);
    console.log(this.US.userdata.username);
    this.usertype = localStorage.getItem('usertype');
    this.headername = localStorage.getItem('name').substr(0, localStorage.getItem('name').length - 12)
  }

  logout(){
    this.US.userlogin = false;

    
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

 
  sideclick(value){
    console.log(value);
    this.CS.selectd_page = value;
    this.selectedpage.emit(value);
    this.router.navigate(['profile']);
  }
}
