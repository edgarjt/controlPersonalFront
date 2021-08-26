import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTreeModule } from "@angular/material/tree";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    MatTreeModule,
    MatDatepickerModule,
    MatStepperModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonToggleModule,
    DragDropModule,
    MatSliderModule,
    MatSnackBarModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
