import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../_services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public usersServices: UsersService
  ) { }

  ngOnInit(): void {
    this.usersServices.getUsers().subscribe(r => {
      console.log(r);
    });
  }

}
