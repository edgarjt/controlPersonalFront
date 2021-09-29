import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";
import { SettingService } from "../_services/setting.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm:any;
  submitted = false;
  disableButtonAdd: boolean;
  isActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private title: Title,
    public settingService: SettingService,
  ) {
    this.disableButtonAdd = false;
    this.loginForm = FormGroup;
    title.setTitle('Control Personal | Login');
  }

  ngOnInit(): void {
    this.settingService.getSetting('register').subscribe(x => {
      if (x.value == 1) {
        this.isActive = true;
      }
    });

    this.loginForm = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  get form() {return this.loginForm?.controls; }

  login(): any {
    this.submitted = true;
    this.disableButtonAdd = true;

    if (this.loginForm.invalid) {
      this.disableButtonAdd = false;
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
        this.disableButtonAdd = false;
        this.toastr.error(error.error.message, 'Error');
      }

      if (error.error.code === 401) {
        this.disableButtonAdd = false;
        this.toastr.error('Usuario o contraseña incorrecta', 'No autorizado');
      }

      if (error.error.code === 422) {
        this.disableButtonAdd = false;
        this.toastr.error(error.error.message, 'Error');
      }
    });

  }

  private redirectUserToPanel() {
    this.router.navigate(['/panel/myDate']);
  }


}
