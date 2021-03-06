import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA   } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
 
import {   MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
 
  MatStepperModule,
   } from '@angular/material';
 
  import {ReactiveFormsModule,FormsModule} from '@angular/forms'
 
import {HttpModule} from '@angular/http';
// import {DataTableModule  } from "angular2-datatable";
import {DataTableModule} from "angular-6-datatable";
// import { ForgetPasswordComponent } from './common/forget-password/forget-password.component';
import { DatatablesPipe } from './common/datatables.pipe';
import { ToastrModule } from 'ngx-toastr';
import { UploadService } from './common/upload.service'
import {Url} from './common/url';
import {approutes } from "./common/routings";
import {UserloginComponent} from './login/userlogin.component';
import { AuthGuard } from './common/auth.guard';
import {UsersComponent  } from "./adminusers/users.component";
import { EmailAuthComponent } from './email-auth/email-auth.component';
import { HeaderComponent } from './common/header/header.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UnitofmeasuersComponent } from './unitofmeasuers/unitofmeasuers.component';
import { HsncodesComponent } from './hsncodes/hsncodes.component';
import {DropdownModule} from 'primeng/dropdown';
import { TaxgroupsComponent } from './taxgroups/taxgroups.component';
import { ProfileComponent } from './profile/profile.component';
// import { NormalusersComponent } from './normalusers/normalusers.component';
import { CategoriesComponent } from './categories/main-categories/categories.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import { SubcategoiresComponent } from './categories/sub-categories/subcategoires.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComingsoonComponent } from './common/comingsoon/comingsoon.component';
import { PaginationSettingsComponent } from './pagination-settings/pagination-settings.component';
import { DataTablesModule } from 'angular-datatables';
import { UiSettingsComponent } from './ui-settings/ui-settings.component';
 

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    UsersComponent,
    EmailAuthComponent,
    DatatablesPipe,
    HeaderComponent,
    SidenavComponent,
    ResetpasswordComponent,
    UnitofmeasuersComponent,
    HsncodesComponent,
    TaxgroupsComponent,
    ProfileComponent,
    CategoriesComponent,
    SubcategoiresComponent,
    DashboardComponent,
    ComingsoonComponent,
    PaginationSettingsComponent,
    UiSettingsComponent 
     
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
     
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
 
    MatStepperModule,
    ReactiveFormsModule,FormsModule,
    HttpModule, 
    ToastrModule.forRoot(),
    approutes,
    DataTableModule,
    DropdownModule,
    InputSwitchModule,
    TooltipModule,
    DataTablesModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
  providers: [UploadService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
