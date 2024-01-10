import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddEmployeeService } from './add-employee.service';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-registering-employee',
  templateUrl: './registering-employee.component.html',
  styleUrl: './registering-employee.component.css',
})
export class RegisteringEmployeeComponent {
  employee: FormGroup;
  showlist = false;
  showUpdateEmployeeButton = false;
  a: { name?: string; salary?: number; age?: number; id?: number } = {};
  arrEmp: any[] = [];
  editEmployeeId: number = 0;
  currentPage:number=1;
  itemsPerPage:number=5;
  totalItem:number=30;
  constructor(private http: HttpClient, private add: AddEmployeeService) {
    this.employee = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      salary: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
    });
    this.ShowList();
  }
  
  ShowList() {
    this.add.getlist().subscribe((el) => {
      for (let emp of el) {
        let obj: { name?: string; salary?: number; age?: number; id?: number } =
          {};
        obj.name = emp.name;
        obj.salary = emp.salary;
        obj.age = emp.age;
        obj.id = emp.id;
        this.arrEmp.push(obj);
      }
    });
  }
  submit() {
    this.a.name = this.employee.get('name')?.value;
    this.a.salary = this.employee.get('salary')?.value;
    this.a.age = this.employee.get('age')?.value;
    this.add.add(this.a).subscribe((response) => {
      this.arrEmp.push(response);
      console.log('Post created successfully:');
    });
    this.showlist = true;

  }

  onEditItem(index: number) {
    this.editEmployeeId = index;
    this.showUpdateEmployeeButton = true;
    this.add
      .getlist()
      .pipe(
        map((el) => {
          this.employee.patchValue({
            name: el[this.editEmployeeId]!.name,
            salary: el[this.editEmployeeId]!.salary,
            age: el[this.editEmployeeId]!.age,
          });
        })
      )
      .subscribe();
  }
  UpdateEmployee() {
    let update: { name?: string; salary?: number; age?: number; id?: number } =
      {
        name: this.employee.get('name')?.value,
        salary: this.employee.get('salary')?.value,
        age: this.employee.get('age')?.value,
      };
    let i = this.arrEmp[this.editEmployeeId].id;
    if (confirm('This action will update employees ' + `Are you sure?`)) {
      this.add.editEmployee(i, update).subscribe();
      this.arrEmp[this.editEmployeeId].name=update.name;
      this.arrEmp[this.editEmployeeId].salary=update.salary;
      this.arrEmp[this.editEmployeeId].age=update.age;
    } else {}
    
  }
 

  DelateEmployee() {
    let i = this.arrEmp[this.editEmployeeId].id;
    if (confirm('This action will delate employees '+ `Are you sure?`)) {
      this.add.delateEmploye(i).subscribe();
      this.arrEmp.splice(this.editEmployeeId,1)
    } else {}

  }
  get pageinatedData(){
    const start=(this.currentPage-1)*this.itemsPerPage;
    const end=start+this.itemsPerPage;
    return this.arrEmp.slice(start,end);
  }
  cangePage(page:number){

    this.currentPage=page;
  }
}
