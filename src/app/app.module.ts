import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app.routing';
import {
  CarDetailViewComponent,
  CarDialogComponent,
  CarListViewComponent,
  ConfirmDialogComponent,
  FuelDialogComponent,
  HomeViewComponent,
  LoadingComponent,
  ShellComponent,
} from './components';

@NgModule({
  declarations: [
    ShellComponent,
    HomeViewComponent,
    CarListViewComponent,
    CarDetailViewComponent,
    CarDialogComponent,
    ConfirmDialogComponent,
    FuelDialogComponent,
    LoadingComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
