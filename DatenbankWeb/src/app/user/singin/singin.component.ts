import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'pocketbase';
import { SinginCredentials } from 'src/app/models/SinginCredentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {
  credentials: SinginCredentials = {
    email: '',
    password1: '',
    password2: ''
  }
  user?: Promise<User>;

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.user = this.AuthService.createUser(this.credentials);
    
    this.user?.then(() => /* this.router.navigate(['/']) */ console.log("signed in"));
  }

  getErrPayload(err: ValidationErrors | null, errType: string) {
    if (err && err[errType]) {
      return err[errType];
    }
    return {};
  }
}
