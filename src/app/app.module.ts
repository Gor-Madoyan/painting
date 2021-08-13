import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
