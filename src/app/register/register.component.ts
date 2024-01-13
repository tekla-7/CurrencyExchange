import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {UserDataType} from '../interfaces/user.interfaces'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  projectForm: FormGroup;
  arr :UserDataType[]= [];
  project :UserDataType= {};
  ngOnInit(): void {}
  constructor(private register:HttpClient){
    this.projectForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]*$/),
          Validators.minLength(7),
        ]),
        confirmpassword: new FormControl(null),
        nickname: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ]),

        phone: new FormControl(null, [
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern(/(955)[0-9 ]*$/),
        ]),
        website: new FormControl('website'),
        checkbox: new FormControl(null, [Validators.required]),
      },

      {
        // validators: passwordconfirm,
      }
    );
  }

  login() {
      this.project.email = this!.projectForm.get('email')!.value;
      this.project.password = this.projectForm.get('password')!.value;
      this.project.confirmpassword =
      this.projectForm.get('confirmpassword')!.value;
      this.project.nickname = this.projectForm.get('nickname')!.value;
      this.project.phone = this.projectForm.get('phone')!.value;
      this.project.website = this.projectForm.get('website')!.value;

      let obj:UserDataType = { ...this.project };
      this.arr.push(obj);
      console.log(this.arr);
    this.register.post<any>('http://localhost:3000/users',obj).subscribe()
  }


 

}
