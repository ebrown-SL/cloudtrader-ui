import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;  
  return password == confirmPassword ? null : { noMatch: true }; 
}
