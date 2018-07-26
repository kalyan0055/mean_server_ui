import { Routes,RouterModule } from "@angular/router";
import {UserloginComponent} from '../login/userlogin.component';
import { AuthGuard } from '../common/auth.guard';
import {UsersComponent  } from "../users/users.component";

const approuts : Routes = [
    {
        path:'', component:UserloginComponent
    },
    {
        path:'users', component:UsersComponent
    },
     

    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: '**', redirectTo: 'users', pathMatch: 'full' }
   
];

export const approutes = RouterModule.forRoot(approuts);