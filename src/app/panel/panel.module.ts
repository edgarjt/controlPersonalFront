import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from "../material.module";
import { AuthService } from "../_services/auth.service";
import { UsersService } from "../_services/user.service";
import { AddUserComponent } from './users/add-user/add-user.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RoleService } from "../_services/role.service";
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { MyDateComponent } from './my-date/my-date.component';
import { WorkComponent } from './work/work.component';
import { SettingComponent } from './setting/setting.component';
import { WorkService } from "../_services/work.service";
import { AddWorkComponent } from './work/add-work/add-work.component';
import { EditWorkComponent } from './work/edit-work/edit-work.component';


@NgModule({
  declarations: [
    RolesComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    MyDateComponent,
    WorkComponent,
    SettingComponent,
    AddWorkComponent,
    EditWorkComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UsersService,
    RoleService,
    WorkService
  ]
})
export class PanelModule {
}
