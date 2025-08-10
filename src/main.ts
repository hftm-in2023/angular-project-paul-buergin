import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Startet die AppComponent und übergibt die gesamte Konfiguration aus app.config.ts
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
