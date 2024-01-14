import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Injectable, inject } from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {
  return !inject(LoginService).isLoggedIn
};
