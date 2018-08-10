// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { map } from 'rxjs/operators';
import { Url } from "./common/url";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  reg_user=[];
  userlogin=false;
  userdata:any=[];
  constructor(public _http:Http) {

   }
   getNewUsers(){  
    let body = {}
     return this.callApi(Url.API.newUsersist,'get',body);
   }
   register(value){
    console.log(value);   
    if(value._id){
      return this.callApi(Url.API.UPDATE_USER,'post',value)
     }
    return this.callApi(Url.API.register,'post',value)
  }
  AddUserInfo(value){
    return this.callApi(Url.API.USER_INFO,'post',value)
  }

  // compRegister(value){
  //   return this.callApi(Url.API.compRegister,'post',value)
  // }

  delete_User(_id){
    let body = {_id:_id}
    return this.callApi(Url.API.DELETE_USER,'post',body)
  }
  
  userinfo_vimage(value){
    return this.callApi(Url.API.USER_INFO_VIMAGE,'post',value)
  }

  userinfo_update_vimage(value){
    return this.callApi(Url.API.USERINFO_UPDATE_VIMAGE,'post',value)
  }
  regViaemail(arg0: any): any {
    return this.callApi(Url.API.regViaemail,'post',arg0)
  }

  fileupload(value){
    return this.callApi(Url.API.FILE_UPLOAD,'post',value)
  }

   callApi(url: string, method: string, body: Object): Observable<any> {
     console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);
 
     const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
   
     headers.append('Access-Control-Allow-Origin', 'http://192.168.0.110:8081');
     headers.append('Access-Control-Allow-Credentials', 'true');
   
     const options = new RequestOptions({ headers: headers });
  
     switch (method) {
       case 'post':
         return this._http
           .post(url, body, options)
           .pipe(map((res:Response)=>res.json()));
       case 'get':
         return this._http
           .get(url, options)
           .pipe(map((response: Response) => response.json()));
     }
   }
  ;
}
