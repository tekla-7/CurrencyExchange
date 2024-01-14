import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
  LoginOrLogout = new Subject<string>;
  isloged:any;
  constructor(private logginservice:LoginService){}
  ngOnInit(): void {
    this.LoginOrLogout=this.logginservice.LoginOrLogout;
     this.isloged=this.logginservice.isLoggedIn; 
    
  }
  logout(){
    this.LoginOrLogout.next('Login');
    this.logginservice.isLoggedIn=false;
    this.isloged=false;
  }
}
