import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm:any;
  submitted = false;
  disableButtonAdd: boolean;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.disableButtonAdd = false;
    this.loginForm = FormGroup;
    this.message = '';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  get form() {return this.loginForm?.controls; }

  login(): any {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return false;
    }

    const params = {
      email: this.form.userEmail.value,
      password: this.form.userPassword.value
    };

    this.authService.login(params).subscribe(response => {
      this.disableButtonAdd = false;

      if (response.status && response.access_token !== null && response !== '') {
        this.authService.storeToken(response.access_token);
        this.authService.storeUserData(response.userData);
        this.redirectUserToPanel();
      }
    }, error => {
      this.disableButtonAdd = false;

      if (error.error.code === 500) {
        this.message = error.error.message;
      }

      if (error.error.code === 401) {
        this.message = error.error.message;
        console.log('Usuario incorrectos')
      }

      if (error.error.code === 422) {
        this.message = 'Datos inválidos';
      }
    });

  }

  private redirectUserToPanel() {
    this.router.navigate(['/panel/roles']);
  }


}
