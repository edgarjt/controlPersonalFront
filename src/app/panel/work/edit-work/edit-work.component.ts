import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WorkService } from "../../../_services/work.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css']
})
export class EditWorkComponent implements OnInit {
  editWorkForm: any = FormGroup;
  submitted = false;
  disableButtonAdd: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataWork: any,
    public dialogRef: MatDialogRef<EditWorkComponent>,
    public cargoService: WorkService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.disableButtonAdd = false;
  }

  ngOnInit(): void {
    this.editWorkForm = this.formBuilder.group({
      id: this.dataWork.id,
      area: new FormControl(this.dataWork.area, [Validators.required]),
      name: new FormControl(this.dataWork.name, [Validators.required]),
      code: new FormControl(this.dataWork.code, [Validators.required]),
      status: new FormControl(this.dataWork.status, [Validators.required]),
      description: new FormControl(this.dataWork.description)
    });
  }

  get form() { return this.editWorkForm.controls }

  editWork(): any {
    this.submitted = true;

    if (this.editWorkForm.invalid) {
      return true;
    }
    this.disableButtonAdd = true;

    this.cargoService.updateWork(this.editWorkForm.value).subscribe(response => {
      if (response.status) {
        this.disableButtonAdd = false;
        this.toastr.success('Cargo actualizado','Éxito');
        this.dialogRef.close(response);
      }
    }, error => {
      this.disableButtonAdd = false;
      this.toastr.error('Cargo no actualizado','Error');
    })
  }
}
