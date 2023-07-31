import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private AuthService: AuthService, private router: Router) {}

  logout(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }
}
