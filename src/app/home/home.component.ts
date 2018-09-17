import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

}