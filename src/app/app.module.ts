import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, CoreModule, HttpModule],
})
export class AppModule {}
