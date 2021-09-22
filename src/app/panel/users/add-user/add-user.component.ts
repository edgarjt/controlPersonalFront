import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from "../../../_services/user.service";
import { ToastrService } from "ngx-toastr";
import { WorkService } from "../../../_services/work.service";
import { STATES_CONSTANT } from "../../../_constants/statesConstant";

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
  cargos: any;
  states: any;

  constructor(
    public userService: UsersService,
    public cargoService: WorkService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService
  ) {
    this.addUser = FormGroup;
    this.disableButtonAdd = false;
    this.load = false;
    this.states = STATES_CONSTANT;
  }

  ngOnInit(): void {
    this.cargoService.getWork().subscribe(response => {
      this.cargos = response;
    })
    this.addUser = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      first_surname: new FormControl('', [Validators.required]),
      last_surname: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(18), Validators.maxLength(18)]),
      rfc: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      state: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      betweenStreet: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      genero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      dep: new FormControl('', [Validators.required]),
      depa: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
      boss: new FormControl(''),
    });
  }

  get form() {return this.addUser.controls}

  addUserForm(): any {
    console.log(this.addUser.invalid);

    this.submitted = true;


    if (this.addUser.invalid) {
      return false;
    }

    console.log('form active');

    this.disableButtonAdd = true;
    this.load = true;

    this.userService.addUsers(this.addUser.value).subscribe(response => {
      if (response.status) {
        this.load = false;
        this.disableButtonAdd = false;
        this.toastr.success('Usuario registrado','Éxito');
        this.dialogRef.close(response);
      }

    }, error => {
      this.load = false;
      this.disableButtonAdd = false;
      this.toastr.error('Usuario no registrado','Error');
    });
  }

}
