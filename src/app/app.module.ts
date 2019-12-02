import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import {
  ShellComponent,
  HomeViewComponent,
  CarListViewComponent,
  CarDetailViewComponent,
  CarDialogComponent,
  ConfirmDialogComponent,
  FuelDialogComponent
} from './components';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShellComponent,
    HomeViewComponent,
    CarListViewComponent,
    CarDetailViewComponent,
    CarDialogComponent,
    ConfirmDialogComponent,
    FuelDialogComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
