import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "biltup-authtest",
      appId: "1:655843253438:web:ec1ab5881891db2d2192ef",
      storageBucket: "biltup-authtest.firebasestorage.app",
      apiKey: "AIzaSyBUsphEUsao38eQk1bl4X9MmGL1QoEVNh0",
      authDomain: "biltup-authtest.firebaseapp.com",
      messagingSenderId: "655843253438" })),
    provideAuth(() => getAuth()),
    provideHttpClient(),
  ]
};
