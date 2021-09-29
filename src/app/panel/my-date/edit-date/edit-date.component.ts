import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { UsersService } from "../../../_services/user.service";
import { ToastrService } from "ngx-toastr";
import { STATES_CONSTANT } from "../../../_constants/statesConstant";

@Component({
  selector: 'app-edit-date',
  templateUrl: './edit-date.component.html',
  styleUrls: ['./edit-date.component.css']
})
export class EditDateComponent implements OnInit {
  updateUserForm: any = FormBuilder;
  updatePasswordForm: any = FormBuilder;
  submitted: boolean = false;
  disableButtonAdd: boolean = false;
  states: any = STATES_CONSTANT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataUser: any,
    private formBuilder: FormBuilder,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditDateComponent>,
  ) { }

  ngOnInit(): void {

    this.updateUserForm = this.formBuilder.group({
      id: this.dataUser.id,
      name: new FormControl(this.dataUser.name, [Validators.required]),
      first_surname: new FormControl(this.dataUser.first_surname, [Validators.required]),
      last_surname: new FormControl(this.dataUser.last_surname, [Validators.required]),
      nacimiento: new FormControl(this.dataUser.nacimiento, [Validators.required]),
      curp: new FormControl(this.dataUser.curp, [Validators.required, Validators.maxLength(18), Validators.minLength(18), Validators.maxLength(18)]),
      rfc: new FormControl(this.dataUser.rfc, [Validators.required, Validators.maxLength(13)]),
      state: new FormControl(this.dataUser.state, [Validators.required]),
      street: new FormControl(this.dataUser.street, [Validators.required]),
      betweenStreet: new FormControl(this.dataUser.betweenStreet, [Validators.required]),
      city: new FormControl(this.dataUser.city, [Validators.required]),
      cp: new FormControl(this.dataUser.cp, [Validators.required, Validators.maxLength(5)]),
      genero: new FormControl(this.dataUser.genero, [Validators.required]),
      date: new FormControl(this.dataUser.date, [Validators.required]),
      type: true
    });

    this.updatePasswordForm = this.formBuilder.group({
      id: this.dataUser.id,
      passwordOld: new FormControl('', [Validators.required]),
      passwordNew: new FormControl('', [Validators.required])
    });
  }

  get form() { return this.updateUserForm.controls };
  get formPassword() { return this.updatePasswordForm.controls };

  updateUser(): any{
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

  updatePassword(): any {
    this.submitted = true;
    if (this.updatePasswordForm.invalid) {
      return true;
    }
    this.disableButtonAdd = true;

    this.usersService.ressetPassword(this.updatePasswordForm.value).subscribe(response => {
      if (response.status) {
        this.toastr.success('Contraseña actualizada','Éxito');
        this.dialogRef.close({type: 'password', status: true});
        this.disableButtonAdd = false;
      }
    }, error => {
      if (error.status == 406) {
        this.toastr.error('Contraseña actual es incorrecta','Error');
      }

      this.disableButtonAdd = false;
    })
  }

}
