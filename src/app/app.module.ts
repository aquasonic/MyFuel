import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ShellComponent, HomeViewComponent } from './components';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ShellComponent, HomeViewComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, HttpClientModule],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
