import { Injectable } from '@angular/core';
import { loginData } from '../interfaces/login.interfaces';
import { BehaviorSubject, Subject, Subscriber, filter } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  LoginOrLogout = new Subject<string>;
  public isLoggedIn = false;
  public isLoggedId:any;
}
