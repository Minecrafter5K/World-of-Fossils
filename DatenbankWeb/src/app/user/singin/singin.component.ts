import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {
  @ViewChild('loginForm') myForm!: NgForm;

  userid?: Promise<string>;

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onFormSubmit(): Promise<void> {
    const vaules = this.myForm.value;

    if (  vaules.email != '' &&
      vaules.password != '' &&
      vaules.username != '' &&
      vaules.password == vaules.passwordConfirm  ) {
        this.userid = this.AuthService.createUser(vaules.email, vaules.password, vaules.passwordConfirm);
    }
    
    this.userid?.then((userid) => this.router.navigate(['/', userid]))
  }
}
