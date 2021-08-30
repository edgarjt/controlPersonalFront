import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WorkService } from "../../../_services/work.service";
import { ToastrService } from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {
  addWorkForm: any = FormGroup;
  submitted = false;
  disableButtonAdd: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public workService: WorkService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddWorkComponent>,
  ) {
    this.disableButtonAdd = false;
  }

  ngOnInit(): void {
    this.addWorkForm = this.formBuilder.group({
      area: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  get form() {return this.addWorkForm.controls}

  addWork(): any {
    this.submitted = true;

    if (this.addWorkForm.invalid) {
      return false;
    }

    this.disableButtonAdd = true;

    this.workService.addWork(this.addWorkForm.value).subscribe( response => {
      if (response.status) {
        this.disableButtonAdd = false;
        this.toastr.success('Usuario registrado','Éxito');
        this.dialogRef.close(response);
      }

    }, error => {
      console.log(error);
      this.disableButtonAdd = false;
      this.toastr.error('Cargo no registrado','Error');
    })
  }
}
