import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() user: any;
  @Output() clickItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();
  hidden=false;
  onClickItem(): void {
    this.clickItem.emit();
    this.hidden=true;
  }
 
}
