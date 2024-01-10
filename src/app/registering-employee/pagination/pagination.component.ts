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
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPageNumber: any;
  pages: any[] = [];
  constructor(private http: AddEmployeeService) {}
  ngOnInit() {
    this.updatePagination();
  }
  pageClicked(page: number) {
    if (page <= this.totalPageNumber && page >= 1) {
      this.onClick.emit(page);
    }
  }
  updatePagination():any{
    this.http.getlist().subscribe((el) => {
      this.totalPageNumber = el.length / this.itemsPerPage;
      this.pages = Array.from(
        { length: this.totalPageNumber },
        (_, i) => i + 1
      );
    });
  }
}
