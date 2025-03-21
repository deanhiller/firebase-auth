import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {FormsModule, NgModel} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, FormsModule],
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
