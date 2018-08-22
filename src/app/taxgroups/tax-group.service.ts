import { Injectable } from '@angular/core';
import{Http,Headers,RequestOptions, Response } from '@angular/http'
import { from } from 'rxjs';
import {UsersService} from '../users.service';
import { Url } from "../common/url";
@Injectable({
  providedIn: 'root'
})
export class TaxGroupService {

  constructor(private US:UsersService) { }
  get_taxGroups(){
    
    let body={}
    return this.US.callApi(Url.API.TAXGROUPS,'get',body);
  }

  addTaxGroup(value){
    let body=value
    return this.US.callApi(Url.API.TAXGROUP_ADD,'post',body);
  }
  updateTaxGroup(value){
    let body=value
    return this.US.callApi(Url.API.TAXGROUP_UPDATE+'/'+body._id,'put',body);
  }

  delete_TaxGroup(id){
  let body={_id:id}
  return this.US.callApi(Url.API.TAXGROUP_DELETE,'post',body);
  }
}
