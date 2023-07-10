import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, { validator: this.match(
          'password',
          'confirm_password',
          'password-mismatch'
        ),
      }
      );
      console.log(this.registerForm.errors);
  }

  match(firstControlName, secondControlName, customError = 'mismatch') {
    return (fg: FormGroup) => {
      return fg.get(firstControlName).value === fg.get(secondControlName).value
        ? null
        : { [customError]: true };
    };
  }

  register() {
    console.log(this.registerForm.value);
    
  }
}
