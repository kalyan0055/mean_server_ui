import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";
@Injectable({
  providedIn: 'root'
})
export class UomService {
  

  constructor(private US:UsersService) { }

  create_uom(value) {
    return this.US.callApi(Url.API.CREATE_UOM,'post',value);
    // throw new Error("Method not implemented.");
  }

  get_uoms(){
    let body={}
    return this.US.callApi(Url.API.CREATE_UOM,'get',body);
  }
}
