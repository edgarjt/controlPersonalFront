import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from "../../../_services/user.service";
import { ToastrService } from "ngx-toastr";
import {WorkService} from "../../../_services/work.service";
import { STATES_CONSTANT } from "../../../_constants/statesConstant";

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
  cargos: any;
  states: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataUser: any,
    private formBuilder: FormBuilder,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public cargoService: WorkService
  ) {
    this.updateUserForm = FormGroup;
    this.disableButtonAdd = false;
    this.load = false;
    this.states = STATES_CONSTANT;
  }

  ngOnInit(): void {
    this.cargoService.getWork().subscribe(response => {
      this.cargos = response;
    })

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
      dep: new FormControl(this.dataUser.dep, [Validators.required]),
      depa: new FormControl(this.dataUser.depa, [Validators.required]),
      cargo: new FormControl(this.dataUser.cargo, [Validators.required]),
      email: new FormControl(this.dataUser.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.dataUser.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      role_id: new FormControl(this.dataUser.role_id.toString(), [Validators.required]),
      boss: new FormControl(this.dataUser.boss)
    });
  }

  get form() { return this.updateUserForm.controls }

  updateUser(): any {
    console.log(this.updateUserForm.invalid);
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
