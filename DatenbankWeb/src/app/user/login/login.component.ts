import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };
  user?: string;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.AuthService.authUser(this.credentials);

    this.router.navigate(['/']);
  }
}
