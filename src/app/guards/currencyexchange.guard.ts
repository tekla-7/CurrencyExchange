import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
export const currencyexchangeGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).CurrencyexchangeShow;
};
