import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

  /** A hero's name can't match the hero's alter ego */
export const passwordvalidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const name = control.get('password');
  const alterEgo = control.get('confirmpassword');

  return name && alterEgo && name.value !== alterEgo.value
    ? { noMatch: true }
    : null;
};

