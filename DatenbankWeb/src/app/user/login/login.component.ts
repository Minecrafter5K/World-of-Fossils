import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') myForm!: NgForm;

  user?: string;

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onFormSubmit(): Promise<void> {
    const vaules = this.myForm.value;

    this.AuthService.authUser(vaules.email, vaules.password)

    // this.router.navigate(['/']);
  }
  logout(): void {
    this.AuthService.logout();
    // this.router.navigate(['/']);
  }
  reload(): void {
    this.user = this.AuthService.getCurrentUser.model?.email;
    console.log(this.AuthService.getCurrentUser);
  }
}
