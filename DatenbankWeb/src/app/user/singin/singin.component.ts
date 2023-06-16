import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SinginCredentials } from 'src/app/models/SinginCredentials';
import { AuthService } from '../../services/auth.service';
import { BaseAuthStore } from 'pocketbase';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {
  credentials: SinginCredentials = {
    email: '',
    password1: '',
    password2: '',
  };

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    await this.AuthService.createUser(this.credentials);

    this.router.navigate(['/']);
  }

  getErrPayload(err: ValidationErrors | null, errType: string) {
    if (err && err[errType]) {
      return err[errType];
    }
    return {};
  }
}
