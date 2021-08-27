import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from "../material.module";
import { AuthService } from "../_services/auth.service";
import {UsersService} from "../_services/user.service";


@NgModule({
  declarations: [
    RolesComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    UsersService
  ]
})
export class PanelModule {
}
