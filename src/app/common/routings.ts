import { Routes,RouterModule } from "@angular/router";
import {UserloginComponent} from '../login/userlogin.component';
import { AuthGuard } from '../common/auth.guard';
import {UsersComponent  } from "../users/users.component";
import { EmailAuthComponent } from '../email-auth/email-auth.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { UnitofmeasuersComponent } from '../unitofmeasuers/unitofmeasuers.component';
import { HsncodesComponent } from '../hsncodes/hsncodes.component';
import { TaxgroupsComponent } from '../taxgroups/taxgroups.component';
import { ProfileComponent } from '../profile/profile.component';
 
const approuts : Routes = [
    {
        path:'', component:UserloginComponent
    },
    {
        path:'login', component:UserloginComponent
    },
    {   path: 'profile',  component: ProfileComponent,canActivate:[AuthGuard] },

    {
        path:'users', component:UsersComponent,canActivate:[AuthGuard]
    },
    {  
         path: 'confirm/:id1/:id2/:id3',  component: EmailAuthComponent
    },
    {   
        path: 'reset/:id1/:id2/:id3',  component: ResetpasswordComponent
    },
    {   path: 'uom',  component: UnitofmeasuersComponent,canActivate:[AuthGuard] },
    {   path: 'hsn',  component: HsncodesComponent,canActivate:[AuthGuard] },
    {   path: 'taxgroups',  component: TaxgroupsComponent,canActivate:[AuthGuard] },


    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: 'users', pathMatch: 'full' }
   
];

export const approutes = RouterModule.forRoot(approuts);