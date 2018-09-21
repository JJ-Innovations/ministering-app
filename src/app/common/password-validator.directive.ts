import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms'
import { Directive } from '@angular/core'

@Directive({
    selector: '[passwordValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
  })
  export class PasswordValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
      return passwordValidator(control)
    }
  }

    /** A hero's name can't match the hero's alter ego */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('credentials-password');
  const alterEgo = control.get('password2');

  return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
};

