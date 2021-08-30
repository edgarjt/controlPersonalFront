import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent implements OnInit {
  dataUser: any;

  constructor(
    public userService: AuthService
  ) {
    this.dataUser = this.userService.getUsers();
  }

  ngOnInit(): void {
  }

}
