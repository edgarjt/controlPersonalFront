import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { RolesComponent } from "./panel/roles/roles.component";
import { UsersComponent } from "./panel/users/users.component";
import { LoginGuard } from "./_guards/login.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate: [LoginGuard], children:
      [
        { path: '', component: RolesComponent },
        { path: 'roles', component: RolesComponent },
        { path: 'users', component: UsersComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
