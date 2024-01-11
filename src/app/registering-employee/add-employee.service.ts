import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  
  constructor(private http: HttpClient) {}
  add(postData: any) {
    return this.http.post<any>('http://localhost:3000/employees', postData);
  }
  getlist() {
    return this.http.get<any>('http://localhost:3000/employees');
  }
  getIdElement(index: number) {
    return this.http.get<any>('http://localhost:3000/employees/' + index);
  }
  editEmployee(index: number, element: any) {
    return this.http.put<any>(
      'http://localhost:3000/employees/' + index,
      element
    );
  }
  delateEmploye(index: number) {
    return this.http.delete('http://localhost:3000/employees/' + index);
  }
  
}
