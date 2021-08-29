import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from "../../../_services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  updateUserForm: any;
  submitted: boolean = false;
  disableButtonAdd: boolean;
  load: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataUser: any,
    private formBuilder: FormBuilder,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
  ) {
    this.updateUserForm = FormGroup;
    this.disableButtonAdd = false;
    this.load = false;
  }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      id: this.dataUser.id,
      name: new FormControl(this.dataUser.name, [Validators.required]),
      first_surname: new FormControl(this.dataUser.first_surname, [Validators.required]),
      last_surname: new FormControl(this.dataUser.last_surname, [Validators.required]),
      email: new FormControl(this.dataUser.email, [Validators.required, Validators.email]),
      role_id: new FormControl(this.dataUser.role_id.toString(), [Validators.required]),
    });
  }

  get form() { return this.updateUserForm.controls }

  updateUser(): any {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return true;
    }
    this.disableButtonAdd = true;

    this.usersService.updateUsers(this.updateUserForm.value).subscribe(response => {
      if (response.status) {
        this.disableButtonAdd = false;
        this.toastr.success('Usuario actualizado','Éxito');
        this.dialogRef.close(response);
      }
    }, error => {
      this.disableButtonAdd = false;
      this.toastr.error('Usuario no actualizado','Error');
    })
  }

}
