import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";

@Injectable({
  providedIn: 'root'
})
export class HsnService {

  constructor(private US:UsersService) { }
  get_uoms(){
    let body={}
    return this.US.callApi(Url.API.HSN_CODES,'get',body);
  }
}
