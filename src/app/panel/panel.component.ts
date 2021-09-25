import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../_services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UsersService } from "../_services/user.service";
import { AvatarComponent } from "./avatar/avatar.component";
import {isObject} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  showFiller = false;
  image: any;

  constructor(
    public dataUser: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userService.getUsersProfile(12, 'profile').subscribe(r => {
      this.preview(r);
    }, error => {
      console.log(error);
    });
  }

  preview(file: any): any {
    const reader = new FileReader();
    reader.onload = x => this.image = reader.result;
    reader.readAsDataURL(file);
  }

  logout() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Tu sesión se cerrara!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9d2449',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataUser.logout().subscribe(response => {
          this.dataUser.clearSessionStorage();
          this.router.navigate(['/login']);
        }, error => {
          console.log(error);
        })
      }
    })
  }

  avatar(data: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';

    const dialogRef = this.dialog.open(AvatarComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(image => {
      if (image)
        this.image = image;
    });
  }

}
