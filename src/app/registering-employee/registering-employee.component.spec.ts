import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteringEmployeeComponent } from './registering-employee.component';

describe('RegisteringEmployeeComponent', () => {
  let component: RegisteringEmployeeComponent;
  let fixture: ComponentFixture<RegisteringEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteringEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteringEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
