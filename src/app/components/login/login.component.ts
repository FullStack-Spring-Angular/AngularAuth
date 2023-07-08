import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/dtos/User';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        const { email, username , roles: [{ name }]} = response.usuarios;
        const role = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        const user: UserDTO = {
          username: username,
          email: email,
          role: role,
          // Otros campos relacionados con el usuario
        };
        this.userAuthService.setUser(user);
        this.userAuthService.setRoles(role);
        this.userAuthService.setToken(response.accessToken);
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
