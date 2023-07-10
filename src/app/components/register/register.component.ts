import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/dtos/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  registrationEnabled = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    }, {
      validator: this.match(
        'password',
        'confirm_password',
        'password-mismatch'
      )
    });
  
    this.registerForm.valueChanges.subscribe(() => {
      this.registrationEnabled = this.registerForm.valid;
    });
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
    this.userService.register(this.registerForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
