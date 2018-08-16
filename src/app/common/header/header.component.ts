import { Component, OnInit } from '@angular/core';
import { UserserviceService } from "../../users/userservice.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public US:UserserviceService, public router:Router) { }
  headername;
  ngOnInit() {
    console.log(this.US.userdata);
    console.log(this.US.userdata.username);
    
    this.headername = localStorage.getItem('name').substr(0, localStorage.getItem('name').length - 12)
  }

  logout(){
    this.US.userlogin = false;

    
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
