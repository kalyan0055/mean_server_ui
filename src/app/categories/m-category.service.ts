 
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { map } from 'rxjs/operators';
import { Url } from "../common/url";
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class MCategoryService {
  reg_user=[];
  userlogin=false;
  userdata:any=[];
  constructor(public _http:Http, private US:UsersService) {

   }
  
   MainCategoriesList(){
     let body={}
    return this.US.callApi(Url.API.MAIN_CATEGORIES_LIST,'get',body);
   }
}
