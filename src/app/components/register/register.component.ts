import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoginResponse} from '../../models/login';
import {RegisterResponse} from '../../models/register.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userService = inject(UserService);
  message: string | null = null;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    const credentials = this.registerForm.value as { username: string; password: string };
    this.userService.fetchRegister(credentials).subscribe({
      next: (res: RegisterResponse) => {
        this.message = "Registration successful";
      },
      error: (err) => {
        this.message = err.error.message
      }
    })
  }
}
