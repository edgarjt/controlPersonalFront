import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  disableButtonAdd: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      betweenStreet: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      dep: new FormControl('', [Validators.required]),
      depa: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      boss: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }

  get form() { return this.registerForm?.controls; }

  register() {
    console.log('OKOK');
  }

}
