import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from "../../_services/user.service";
import {MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { AddUserComponent } from "./add-user/add-user.component";
import { isObject } from "rxjs/internal-compatibility";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message: any;
  dataToken: any;
  dataUser: any;


  constructor(
    public usersServices: UsersService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['name', 'surname', 'email', 'role_id', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;

  ngOnInit(): void {
    this.usersServices.getUsers().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator || null;
      //this.dataSource.filter = filterValue.trim().toLowerCase();
    },  error => {
      console.log(error);
    });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '650px';

    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(addGroup => {
      if (isObject(addGroup)) {
        this.tableAddItem(addGroup.data);
        // this.methods.tableAddItem(addGroup.data);
      }

    });
  }

  tableAddItem(group: any) {
    const data = this.dataSource.data;
    data.push(group);
    this.dataSource.data = data;
  }

}
