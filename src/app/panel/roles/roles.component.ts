import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { RoleService } from "../../_services/role.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(
    public rolesServices: RoleService
  ) { }

  displayedColumns: string[] = ['name', 'code', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;

  ngOnInit(): void {
    this.rolesServices.getRoles().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator || null;
    }, error => {
      console.log(error);
    })
  }

  addRol() {
    console.log('okokok');
  }
}
