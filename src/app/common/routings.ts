import { Routes,RouterModule } from "@angular/router";
import {UserloginComponent} from '../login/userlogin.component';
import { AuthGuard } from '../common/auth.guard';
import {UsersComponent  } from "../users/users.component";
import { EmailAuthComponent } from '../email-auth/email-auth.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { UnitofmeasuersComponent } from '../unitofmeasuers/unitofmeasuers.component';
import { HsncodesComponent } from '../hsncodes/hsncodes.component';
 
const approuts : Routes = [
    {
        path:'', component:UserloginComponent
    },
    {
        path:'login', component:UserloginComponent
    },
    {
        path:'users', component:UsersComponent,canActivate:[AuthGuard]
    },
    {  
         path: 'confirm/:id1/:id2/:id3',  component: EmailAuthComponent
    },
    {   
        path: 'reset/:id1/:id2/:id3',  component: ResetpasswordComponent
    },
    {   path: 'uom',  component: UnitofmeasuersComponent },
    {   path: 'hsn',  component: HsncodesComponent },


    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: 'users', pathMatch: 'full' }
   
];

export const approutes = RouterModule.forRoot(approuts);