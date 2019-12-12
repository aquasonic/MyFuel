import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app.routing';
import { CarDetailViewComponent } from './components/car-detail-view/car-detail-view.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { CarListViewComponent } from './components/car-list-view/car-list-view.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from './components/fuel-dialog/fuel-dialog.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ShellComponent } from './components/shell/shell.component';
import { AppState } from './state/app.state';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AppState])
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
