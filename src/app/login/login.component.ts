import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { from } from 'rxjs';
import { loginData } from '../interfaces/login.interfaces';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private logginService: LoginService,
    private http: HttpClient
  ) {
    this.logginService.LoginOrLogout.next('Login');

  }
  login() {
    this.http
      .get<any>('http://localhost:3000/users')
      .pipe()
      .subscribe((elements) => {
        const user = elements.find((element: any) => {
          if (
            element.email == this.form.value.email &&
            element.password == this.form.value.password
          ) {
            this.logginService.isLoggedId = element.id;
          }
          return (
            element.email == this.form.value.email &&
            element.password == this.form.value.password
          );
        });
        if (user) {
          this.logginService.isLoggedIn = true;
          this.logginService.LoginOrLogout.next('Logout');
          this.form.reset();
          this.router.navigate(['/users']);
        } else {
          this.logginService.isLoggedIn = false;
          this.logginService.LoginOrLogout.next('Login');
        }
      });
  }
  
  register() {
    this.router.navigate(['/register']);
  }
}
