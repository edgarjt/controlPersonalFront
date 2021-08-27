import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from "../material.module";
import { AuthService } from "../_services/auth.service";
import { UsersService } from "../_services/user.service";
import { AddUserComponent } from './users/add-user/add-user.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    RolesComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UsersService
  ]
})
export class PanelModule {
}
