import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { ShellComponent } from './components';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ShellComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
