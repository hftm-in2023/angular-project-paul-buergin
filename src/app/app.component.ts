// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Für die date pipe oder andere CommonModule-Features

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  // <<< HIER WIRD DER LINK ENTFERNT >>>
  template: `
    <header>
      <h1>Mein Angular Blog</h1>
      <nav>
        <a routerLink="/">Alle Blogs</a>
        </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <p>&copy; {{ currentYear }} Mein Angular Blog</p>
    </footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
}