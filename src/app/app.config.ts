// src/app/app.config.ts (oder der Ort, wo Ihre App-Konfiguration ist)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // <<< Dieser Import MUSS da sein

import { routes } from './app.routes'; // <<< Ihre definierten Routen
import { provideHttpClient } from '@angular/common/http'; // Auch das sollte hier sein

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // <<< Hier wird der Router bereitgestellt
    provideHttpClient() // Wichtig für HTTP-Anfragen
    // ... andere Provider, z.B. provideAnimations() für Angular Material
  ]
};