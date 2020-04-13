import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
