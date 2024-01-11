import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddEmployeeService } from '../add-employee.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() totalItem: any;
  @Input() currentPage: any;
  @Input() page: any;
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPageNumber: any;
  pages: any[] = [];
  constructor(private http: AddEmployeeService) {
    this.updatePagination();
  }
  ngOnInit() {
    this.updatePagination();
  }
  pageClicked(page: number) {
    if (page <= this.totalPageNumber && page >= 1) {
      this.onClick.emit(page);
    }
  }
  ngOnChanges() {
    this.updatePagination();
  }
  updatePagination(): any {
    this.totalPageNumber = Math.ceil(this.page / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPageNumber }, (_, i) => i + 1);
  }
}
