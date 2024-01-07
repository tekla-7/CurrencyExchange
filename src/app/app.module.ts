import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpComponent } from './http/http.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { UserComponent } from './form/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpComponent,
    FormComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
