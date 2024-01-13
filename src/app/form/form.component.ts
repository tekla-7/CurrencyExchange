import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {UserDataType} from '../interfaces/user.interfaces'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  
  projectForm: FormGroup;
  editMode = false;
  removeuser = false;
  arr :UserDataType[]= [];
  i: number=0;
  project :UserDataType= {};
  ngOnInit(): void {}
  constructor(private edit:HttpClient){
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
    this.edit.get<any>("http://localhost:3000/users").subscribe((el) => {
      for (let emp of el) {
        let obj: UserDataType ={};
        obj.email = emp.email;
        obj.password = emp.password;
        obj.nickname = emp.nickname;
        obj.phone = emp.phone;
        obj.website = emp.website;
        obj.id=emp.id
        this.arr.push(obj);
      }
    });
  }

  login() {
      this.project.email = this!.projectForm.get('email')!.value;
      this.project.password = this.projectForm.get('password')!.value;
      this.project.confirmpassword =
      this.projectForm.get('confirmpassword')!.value;
      this.project.nickname = this.projectForm.get('nickname')!.value;
      this.project.phone = this.projectForm.get('phone')!.value;
      this.project.website = this.projectForm.get('website')!.value;
      let obj = { ...this.projectForm.value };
      this.arr[this.i].email = obj.email;
      let index=this.arr[this.i].id;
      console.log(index)
    this.edit.put<any>("http://localhost:3000/users/"+index,obj).subscribe()
    
  }


  onEditItem(index: number) {
    this.projectForm.patchValue({
      email: this.arr[index]!.email,
      password: this.arr[index].password,
      confirmpassword: this.arr[index].confirmpassword,
      nickname: this.arr[index].nickname,
      phone: this.arr[index].phone,
      website: this.arr[index].website,
    });
    this.i = index;
    this.editMode=true;
  }


  removeUser() {
    this.editMode = false;
    let index=this.arr[this.i].id;
    let ask =
      'This action will remove a user with this email: ' +
      this.arr[this.i].email;
    if (confirm(ask + `   Are you sure?`)) {
      this.edit.delete('http://localhost:3000/users/' + index).subscribe();
      this.arr.splice(this.i, 1);
    } else {
      this.removeuser = false;
    }
  }

  get emailCtrl() : AbstractControl{
   return this.projectForm.get('email') as AbstractControl; 
  }

  get email(): string{
    return this.emailCtrl.value;
  }


}


