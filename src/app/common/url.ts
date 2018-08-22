import { environment } from "../../environments/environment";
export class Url {
    public static API = { 
        register : environment.url+'users/register',
        newUsersist : environment.url+'users/newuserslist',
        UPDATE_USER : environment.url+'users/updateuser',
        DELETE_USER :environment.url +'users/deleteuser',
        FILE_UPLOAD : environment.url + 'fileupload',
        USER_INFO : environment.url + 'authentication/userinfo',
        USER_INFO_VIMAGE : environment.url + 'authentication/userinfo_vimage',
        USERINFO_UPDATE_VIMAGE :environment.url + 'authentication/userinfo_update_vimage',
        // regViaemail :environment.url + 'users/registervialink',
        regViaemail :environment.url + 'user/sendpresignupotp',
        SENDPASSWORDLINK :environment.url + 'users/sendPasswordLink',
        DISABLE_USER: environment.url + 'users/disableUser',
        RESET_PASSWORD: environment.url + 'auth/reset',

        //PROFILE
        UPDATE_PROFILE : environment.url+'users',
        CHANGE_PROFILE : environment.url+'users/profilePicture',

        //UNIT OF MEASUREMENTS
        CREATE_UOM: environment.url + 'unitofmeasures',


        //HSN CODES
        HSN_CODES: environment.url + 'hsncodes',
        addHSN: environment.url + 'hsncodes',
        UPDATEHSN: environment.url + 'hsnupdate',
        DELETE_HSN : environment.url + 'hsndelete',
  

        //TAXGROUPS
        TAXGROUPS: environment.url + 'taxGroup',
        TAXGROUP_ADD: environment.url + 'taxGroup',
        TAXGROUP_UPDATE: environment.url + 'taxGroup',
        TAXGROUP_DELETE : environment.url + 'deleteTaxGroups'

}   
}