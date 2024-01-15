import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpComponent } from './http/http.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { UserComponent } from './form/user/user.component';
import { RegisteringEmployeeComponent } from './registering-employee/registering-employee.component';
import { EmployeesComponent } from './registering-employee/employees/employees.component';
import { PaginationComponent } from './registering-employee/pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './form/user/user-edit/user-edit.component';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';
import { currencyexchangeGuard } from './guards/currencyexchange.guard';
const appRouts: Routes = [
  { path: '', component: LoginComponent, canActivate:[homeGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'registering-employee', component: RegisteringEmployeeComponent },
  { path: 'users', component: FormComponent ,canActivate: [loginGuard],},
  {
    path: 'users/:id',
    component: UserEditComponent,
    canActivate: [loginGuard],
  },
  { path: 'currency', component: HttpComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HttpComponent,
    FormComponent,
    UserComponent,
    RegisteringEmployeeComponent,
    EmployeesComponent,
    PaginationComponent,
    LoginComponent,
    TopBarComponent,
    RegisterComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouts),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
