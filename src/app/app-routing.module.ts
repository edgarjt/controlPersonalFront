import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { RolesComponent } from "./panel/roles/roles.component";
import { UsersComponent } from "./panel/users/users.component";
import { LoginGuard } from "./_guards/login.guard";
import { MyDateComponent } from "./panel/my-date/my-date.component";
/*import { WorkComponent } from "./panel/work/work.component";*/
import { SettingComponent } from "./panel/setting/setting.component";
import { LogoutGuard } from "./_guards/logout.guard";
import { RolesGuard } from "./_guards/roles.guard";
import { RegisterComponent } from "./register/register.component";
import { SettingGuard } from "./_guards/setting.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [SettingGuard] },
  { path: 'panel', component: PanelComponent, canActivate: [LoginGuard], children:
      [
        { path: '', component: UsersComponent },
        /*{ path: 'roles', component: RolesComponent },*/
        { path: 'myDate', component: MyDateComponent },
        { path: 'users', canActivate: [RolesGuard], component: UsersComponent },
/*        { path: 'works', canActivate: [RolesGuard], component: WorkComponent },*/
        { path: 'setting', canActivate: [RolesGuard],  component: SettingComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
