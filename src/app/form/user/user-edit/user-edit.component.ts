import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDataType } from '../../../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  projectForm: FormGroup;
  editMode = true;
  removeuser = false;
  arr: UserDataType[] = [];
  i: number = 0;
  id: any;
  editId: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onEditItem(this.id)
  }
  constructor(private edit: HttpClient, private route: ActivatedRoute) {
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
onEditItem(id:any) { 
    this.edit.get<any>("http://localhost:3000/users/"+this.id).subscribe((emp) => {
        this.projectForm.patchValue({
      email: emp.email,
      password: emp.password,
      confirmpassword: emp.confirmpassword,
      nickname: emp.nickname,
      phone: emp.phone,
      website: emp.website,
    });
    });
    
  
  }
  login() {
    let obj = { ...this.projectForm.value };
    let ask =
      'This action will update a user with this email: '
    if (confirm(ask + `   Are you sure?`)) {
      this.edit
      .put<any>('http://localhost:3000/users/' + this.id, obj)
      .subscribe();
      console.log('this is'+this.id)
    } else {
      
    }
    
  }

  removeUser() {
    console.log(this.id)
    let ask =
      'This action will remove a user with this email: '
    if (confirm(ask + `   Are you sure?`)) {
      this.edit.delete('http://localhost:3000/users/' + this.id).subscribe();
    } else {}
  }

 
}
