import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_services/auth.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { EditDateComponent } from "./edit-date/edit-date.component";
import {isObject} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent implements OnInit {
  dataUser: any;

  constructor(
    public userService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataUser = this.userService.getUsers();
  }

  ngOnInit(): void {
  }

  editDate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.dataUser;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditDateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateUser => {
      if (isObject(updateUser)) {
        if (updateUser.status && updateUser.type != 'password') {
          this.dataUser = updateUser.data;
          this.userService.storeUserData(updateUser.data);
        }
      }
    });
  }

}
