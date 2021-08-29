import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  showFiller = false;

  constructor(
    public dataUser: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Tu sesión se cerrara!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9d2449',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataUser.logout().subscribe(response => {
          this.dataUser.clearSessionStorage();
          this.router.navigate(['/login']);
        }, error => {
          console.log(error);
        })
      }
    })
  }

}
