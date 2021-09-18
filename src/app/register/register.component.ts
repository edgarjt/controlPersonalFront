import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UsersService } from "../_services/user.service";
import { STATES_CONSTANT } from "../_constants/statesConstant";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  disableButtonAdd: boolean = false;
  states: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {
    this.states = STATES_CONSTANT;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      first_surname: new FormControl('', [Validators.required]),
      last_surname: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      betweenStreet: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      dep: new FormControl('', [Validators.required]),
      depa: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      boss: new FormControl('')
    });
  }

  get form() { return this.registerForm?.controls; }

  register(): any {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return false;
    }

    this.userService.addUsersGeneral(this.registerForm.value).subscribe(response => {
      if (response.status) {
        this.toastr.success('Se registro con éxito', 'Registro')
      }
    }, error => {
      this.toastr.error('Ocurrio un error al tratar de guardar los datos', 'Error');
    });
  }

}
