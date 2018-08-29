// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SubCategoryService {

//   constructor() { }
// }
 
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { map } from 'rxjs/operators';
import { Url } from "../../common/url";
import { UsersService } from '../../users.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  reg_user=[];
  userlogin=false;
  userdata:any=[];
  constructor(public _http:Http, private US:UsersService) {

   }
  
   SubCategoriesList(){
     let body={}
    return this.US.callApi(Url.API.SUB_CATEGORIES1_LIST,'get',body);
   }

   disable_MainCategory(_id,type) {
    let body = { id: _id,type:type }
    return this.US.callApi(Url.API.MAIN_CATEGORIES_DISABLE_ENABLE, 'post', body);
  }

  create_Sub_Categories(value){
    let body = value;
    return this.US.callApi(Url.API.CREATE_SUB_CATEGORIES, 'post', body)
  }

 update_Sub_Categories(value){
    let body = value;
    return this.US.callApi(Url.API.UPDATE_SUB_CATEGORIES, 'post', body)
  }
}
