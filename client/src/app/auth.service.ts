import {EnvironmentInjector, inject, Injectable, runInInjectionContext} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  AuthProvider
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private injector = inject(EnvironmentInjector);

  async signUp(email: string, password: string) {
    console.log(`email=${email} pw=${password}`);
    const creds = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(`creds=${JSON.stringify(creds)}`);
    return creds;
  }

  async signIn(email: string, password: string) {
    const creds = signInWithEmailAndPassword(this.auth, email, password);
    console.log(`creds=${JSON.stringify(creds)}`);
    return creds;
  }

  async microsoftSignIn() {
    const provider = new OAuthProvider('microsoft.com');
    return await this.genericSignIn(provider);
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    return await this.genericSignIn(provider);
  }

  private async genericSignIn(provider: AuthProvider) {
    const credential = await runInInjectionContext(this.injector, async () => await signInWithPopup(this.auth, provider));
    console.log(`creds=${JSON.stringify(credential)}`);


    const token = await credential.user?.getIdToken();
    this.http.post('http://localhost:3000/verifyToken', {token}).subscribe(response => {
      console.log('Backend verification response:', response);
    });
    return credential.user;
  }

  async signOut() {
    await runInInjectionContext(this.injector, async () => await this.auth.signOut());
  }
}

