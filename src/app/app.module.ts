import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { ShellComponent } from './components';

@NgModule({
  declarations: [ShellComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule {}
