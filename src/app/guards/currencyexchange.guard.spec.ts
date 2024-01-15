import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { currencyexchangeGuard } from './currencyexchange.guard';

describe('currencyexchangeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => currencyexchangeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
