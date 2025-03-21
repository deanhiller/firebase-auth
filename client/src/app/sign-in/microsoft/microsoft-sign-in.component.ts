import { Component } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'microsoft-sign-in',
  standalone: true,
  templateUrl: './microsoft-sign-in.component.html',
})
export class MicrosoftSignInComponent {
  constructor(private authService: AuthService) {}

  signIn() {
    this.authService.microsoftSignIn().then(user => {
      console.log('User signed in:', user);
    }).catch(error => {
      console.error('Sign-in error:', error);
    });
  }
}
