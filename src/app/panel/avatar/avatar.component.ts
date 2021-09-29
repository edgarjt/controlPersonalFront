import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../_services/user.service";
import { environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  imgAvatar: any;
  imgOriginal: any;
  file: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataWork: any,
    public dialogRef: MatDialogRef<AvatarComponent>,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dataUser: AuthService
  ) {}

  ngOnInit(): void {
    this.getAvatar(this.dataWork, 'original');
  }

  preview(file: any): any {
    const reader = new FileReader();
    reader.onload = x => this.imgAvatar = reader.result;
    reader.readAsDataURL(file);
  }

  resetAvatar(): any {
    this.preview(this.imgOriginal);
  }

  getAvatar(id: number, type:string): any {
    this.usersService.getUsersProfile(id, type).subscribe(r => {
      this.imgOriginal = r;
      this.preview(r);
    }, error => {
      console.log(error);
    });
  }

  changeAvatar(e: any) {
    this.file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.preview(file);
    }

  }

  saveAvatar() {
    if (this.file) {
      const formData = new FormData();
      formData.append('id', this.dataWork);
      formData.append('profile', this.file);

      this.usersService.addProfile(formData).subscribe(x => {
        if (x.status) {
          this.getAvatar(this.dataWork, 'profile');
          this.dialogRef.close(this.imgAvatar);
        }
      }, error => {
        this.toastr.error('Imagen no soportada', 'Imagen error');
        console.log(error.message);
      })
    }
  }

  deleteAvatar() {
    if (this.imgOriginal) {
      this.usersService.deleteUserProfile(this.dataWork).subscribe(r => {
        if (r.status) {
          this.imgAvatar = null;
          this.dialogRef.close('delete');
        }
      }, error => {
        console.log(error);
      })
    }
  }

}
