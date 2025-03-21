import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  template: `<button (click)="signInWithGoogle()">Sign in with Google</button>`
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.googleSignIn().then(user => {
      console.log('User signed in:', user);
    }).catch(error => {
      console.error('Sign-in error:', error);
    });
  }
}
