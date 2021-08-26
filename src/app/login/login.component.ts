import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm:any;
  submitted = false;
  disableButtonAdd: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.disableButtonAdd = false;
    this.loginForm = FormGroup;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  get form() {return this.loginForm?.controls; }

  login() {
    console.log('ooko');
  }

}
