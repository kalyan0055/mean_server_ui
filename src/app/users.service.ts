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
  reg_user = [];
  userlogin = false;
  userdata;
  constructor(public _http: Http) {

  }
  getNewUsers() {
    let body = {}
    return this.callApi(Url.API.newUsersist + '/' + localStorage.getItem('userid'), 'get', body);
  }
  
  AddUserInfo(value) {
    return this.callApi(Url.API.USER_INFO, 'post', value)
  }

  delete_User(_id) {
    let body = {}
    return this.callApi(Url.API.DELETE_USER + '/' + _id, 'delete', body)
  }


  regViaemail(arg0: any): any {
    return this.callApi(Url.API.regViaemail, 'post', arg0)
  }

  fileupload(value) {
    return this.callApi(Url.API.FILE_UPLOAD, 'post', value)
  }

  sendPasswordLink(value): any {
    return this.callApi(Url.API.SENDPASSWORDLINK, 'post', value)
  }

  disable_User(_id, type) {
    let body = { id: _id, type: type }
    return this.callApi(Url.API.DISABLE_USER, 'post', body)
  }

  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://192.168.0.110:8081');
    headers.append('Access-Control-Allow-Credentials', 'true');
    if (localStorage.getItem('token')) {
      headers.append(
        'token', localStorage.getItem('token')
      );
    }
    const options = new RequestOptions({ headers: headers });

    switch (method) {
      case 'post':
        return this._http
          .post(url, body, options)
          .pipe(map((res: Response) => res.json()));
      case 'get':
        return this._http
          .get(url, options)
          .pipe(map((response: Response) => response.json()));
      case 'put':
        return this._http
          .put(url, body, options)
          .pipe(map((response: Response) => response.json()));
      case 'delete':
        return this._http
          .delete(url, options)
          .pipe(map((response: Response) => response.json()));
    }
  }
  ;
}
