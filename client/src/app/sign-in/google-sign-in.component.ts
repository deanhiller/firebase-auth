import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'googleapp-sign-in',
  standalone: true,
  templateUrl: './google-sign-in.component.html',
})
export class GoogleSignInComponent {
  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.googleSignIn().then(user => {
      console.log('User signed in:', user);
    }).catch(error => {
      console.error('Sign-in error:', error);
    });
  }
}
