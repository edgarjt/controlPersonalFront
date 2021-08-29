import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { RolesComponent } from "./panel/roles/roles.component";
import { UsersComponent } from "./panel/users/users.component";
import { LoginGuard } from "./_guards/login.guard";
import { MyDateComponent } from "./panel/my-date/my-date.component";
import { WorkComponent } from "./panel/work/work.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate: [LoginGuard], children:
      [
        { path: '', component: UsersComponent },
        /*{ path: 'roles', component: RolesComponent },*/
        { path: 'myDate', component: MyDateComponent },
        { path: 'users', component: UsersComponent },
        { path: 'works', component: WorkComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
