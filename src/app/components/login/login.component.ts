import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoginResponse} from '../../models/login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    userService = inject(UserService);
    errorMessage: string | null = null;


    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    get userNameIsInvalid() {
      return (
        this.loginForm.controls.username.touched &&
        this.loginForm.controls.username.dirty &&
        this.loginForm.controls.username.invalid
      )
    }

    get passwordIsInvalid() {
      return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
      )
    }

    onSubmit() {
      const credentials = this.loginForm.value as { username: string; password: string };
      this.userService.fetchLogin(credentials).subscribe({
        next: (res: LoginResponse) => {
          localStorage.setItem('accessToken', res.accessToken );
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = err.error.message
        }
      })
    }
}
