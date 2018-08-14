import { Component, OnInit ,EventEmitter,Output,Input  } from '@angular/core';
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() selectedpage=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  sideclick(value){
    console.log(value);
    this.selectedpage.emit(value);
  }

}
