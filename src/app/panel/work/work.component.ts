import {Component, OnInit, ViewChild} from '@angular/core';
import { WorkService } from "../../_services/work.service";
import { MatTableDataSource} from "@angular/material/table";
import { MatPaginator} from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { isObject } from "rxjs/internal-compatibility";
import { AddWorkComponent } from "./add-work/add-work.component";
import { EditWorkComponent } from "./edit-work/edit-work.component";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  load: boolean;

  constructor(
    public workService: WorkService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.load = true;
  }

  displayedColumns: string[] = ['area', 'name', 'code', 'status', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;


  ngOnInit(): void {
    this.workService.getWork().subscribe(response => {
      this.load = false;
      if (response.length > 0) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator || null;
      }
    }, error => {
      this.load = false;
      console.log(error);
    })
  }

  addWork() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '650px';

    const dialogRef = this.dialog.open(AddWorkComponent, dialogConfig);

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

  editWork(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditWorkComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateWork => {
      if (isObject(updateWork)) {
        this.updateRow(updateWork.data)
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

  deleteWork(id: number) {
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
        this.workService.deleteWork(params).subscribe(response => {
          if (response.status) {
            this.removeItemFromTable(response.data.id);
            this.toastr.success(response.message, 'Éxito');
          }
        }, error => {
          this.toastr.error('Cargo no eliminado', 'Error')
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
