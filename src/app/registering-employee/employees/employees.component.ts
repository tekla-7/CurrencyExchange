import { Component ,EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  @Input() emp: any;
  @Output() clickItem = new EventEmitter();
constructor(){
  // console.log(this.emp)
}
  onClickItem(): void {
    this.clickItem.emit();
  }
}
