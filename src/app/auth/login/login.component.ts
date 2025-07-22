import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EncryptService } from '../../services/encrypt.service';
import { UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly encryptService = inject(EncryptService);
  private readonly router = inject(Router);

  ngOnInit(){
    // Initialize the login form here
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false)
    });
  }
  get formControls() {
    return this.loginForm;
  }

  login(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response: UserResponse) => {
          console.log('Login successful', response);
          const encryptedData = this.encryptService.encryptToken(response.token);
          localStorage.setItem('token', encryptedData);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }

}
