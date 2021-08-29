import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from "../../_services/user.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { AddUserComponent } from "./add-user/add-user.component";
import { isObject } from "rxjs/internal-compatibility";
import { EditUserComponent } from "./edit-user/edit-user.component";
import Swal from 'sweetalert2'
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message: any;
  load: boolean


  constructor(
    public usersServices: UsersService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.load = true;
  }

  displayedColumns: string[] = ['name', 'surname', 'email', 'role_id', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;

  ngOnInit(): void {
    this.usersServices.getUsers().subscribe(response => {
      if (response.length > 0) {
        this.load = false;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator || null;
      }
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

  editUser(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateUser => {
      if (isObject(updateUser)) {
        this.updateRow(updateUser.data)
      }
    });
  }

  updateRow(dataUpdate: any) {
    const data = this.dataSource.data;
    // @ts-ignore
    const foundIndex = data.findIndex(x => x.id === dataUpdate.id);

    data[foundIndex] = dataUpdate;
    this.dataSource.data = data;
  }

  deleteUser(id: number) {
    console.log(id);
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9d2449',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {id: id};
        this.usersServices.deleteUser(params).subscribe(response => {
          if (response.status) {
            this.removeItemFromTable(response.data.id);
            this.toastr.success(response.message, 'Éxito');
          }
        }, error => {
          this.toastr.error('Usuario no eliminado', 'Error')
        });
      }
    })
  }

  removeItemFromTable(idItem: any) {
    const data = this.dataSource.data;
    const index = data.findIndex(x => {
      // @ts-ignore
      return x.id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
