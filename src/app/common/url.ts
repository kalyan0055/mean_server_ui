import { environment } from "../../environments/environment";
export class Url {
    public static API = { 
        register : environment.url+'users/register',
        newUsersist : environment.url+'users/newuserslist',
        UPDATE_USER : environment.url+'users/updateuser',
        DELETE_USER :environment.url +'users/deleteuser',
        USER_INFO : environment.url + 'authentication/userinfo',
        USER_INFO_VIMAGE : environment.url + 'authentication/userinfo_vimage',
        USERINFO_UPDATE_VIMAGE :environment.url + 'authentication/userinfo_update_vimage'
    }
} 