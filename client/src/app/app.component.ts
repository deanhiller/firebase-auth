import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoogleSignInComponent} from './sign-in/google-sign-in.component';
import {FormsModule, NgModel} from '@angular/forms';
import {AuthService} from './auth.service';
import {MicrosoftSignInComponent} from './sign-in/microsoft/microsoft-sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleSignInComponent, FormsModule, MicrosoftSignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);
  title = 'client';

  email: string = '';
  password: string = '';

  async signUp() {
    await this.authService.signUp(this.email, this.password);
  }
}
