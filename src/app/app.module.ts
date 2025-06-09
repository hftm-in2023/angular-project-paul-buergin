import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]) // Routen kannst du später ergänzen
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
