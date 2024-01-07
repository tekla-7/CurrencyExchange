import { Component ,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user: any;
  @Output() clickItem = new EventEmitter();

  onClickItem(): void {
    this.clickItem.emit();
  }
}
