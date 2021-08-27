import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from "../../../_services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUser: any;
  submitted = false;
  disableButtonAdd: boolean;
  load: boolean;
  dataRoles: any;

  constructor(
    public userService: UsersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
  ) {
    this.addUser = FormGroup;
    this.disableButtonAdd = false;
    this.load = false
  }

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      first_surname: new FormControl('', [Validators.required]),
      last_surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
    });
  }

  get form() {return this.addUser.controls}

}
