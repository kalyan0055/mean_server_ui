import { Component, OnInit ,EventEmitter,Output,Input  } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usertype;
  @Output() selectedpage=new EventEmitter();
  constructor(public US:UsersService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');
       
  }

  sideclick(value){
    console.log(value);
    this.selectedpage.emit(value);
  }

}
