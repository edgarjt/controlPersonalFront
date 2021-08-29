import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from "../../../_services/user.service";
import { ToastrService } from "ngx-toastr";

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
    private toastr: ToastrService
  ) {
    this.addUser = FormGroup;
    this.disableButtonAdd = false;
    this.load = false;
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

  addUserForm(): any {

    this.submitted = true;

    if (this.addUser.invalid) {
      return false;
    }

    this.disableButtonAdd = true;
    this.load = true;

    const params = {
      name: this.form.name.value,
      first_surname: this.form.first_surname.value,
      last_surname: this.form.last_surname.value,
      email: this.form.email.value,
      password: this.form.password.value,
      theme: 'light-theme',
      role_id: this.form.role_id.value

    };

    this.userService.addUsers(params).subscribe(response => {
      this.load = false;
      this.disableButtonAdd = false;
      this.toastr.success('Usuario registrado','Éxito');
      this.dialogRef.close(response);

    }, error => {
      this.load = false;
      this.disableButtonAdd = false;
      this.toastr.error('Usuario no registrado','Error');
    });
  }

}
