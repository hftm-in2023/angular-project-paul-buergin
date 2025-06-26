// src/app/blog-list/blog-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// catchError wird hier nicht mehr benötigt, da wir es entfernt haben.
// map wird weiterhin für response.data verwendet.
import { map } from 'rxjs/operators';

// Interface für einen einzelnen Blog-Eintrag (AN BACKEND-STRUKTUR ANPASSEN!)
interface BlogEntry {
  id: string; // Oder number, je nachdem, wie es vom Backend kommt (10.JPG zeigt number)
  title: string;
  author: string;
  // HINZUFÜGEN: createdAt, da es im Template verwendet wird und vom Backend kommt
  createdAt: string;
  // publishDate kann entfernt werden, wenn Sie es nicht mehr verwenden
  // publishDate: string;
}

// Interface für die gesamte Backend-Antwort (Liste der Einträge)
interface BackendResponse {
  data: BlogEntry[];
  maxPageSize: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  title = 'Angular Blog';
  blogEntries: BlogEntry[] = [];

  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    console.log('📡 Anfrage an Backend startet: ' + this.apiUrl);
    this.http.get<BackendResponse>(this.apiUrl).pipe(
      map(response => response.data)
      // !!! DIESEN catchError-Block VOLLSTÄNDIG ENTFERNEN ODER AUSKOMMENTIEREN !!!
      // catchError(error => {
      //   console.error('❌ Fehler beim Laden der Blog-Einträge:', error);
      //   return [];
      // })
    ).subscribe({
      next: (data: BlogEntry[]) => {
        this.blogEntries = data;
        console.log('✅ Backend-Antwort (direkt abonniert):', this.blogEntries);
        if (this.blogEntries.length === 0) {
          console.log('ℹ️ Empfangene Daten sind leer.');
        } else {
          console.log(`✅ ${this.blogEntries.length} Blog-Einträge erfolgreich geladen.`);
        }
      },
      error: (err) => console.error('❌ Fehler beim Abonnement (wird normalerweise vom GlobalErrorHandler gefangen):', err)
    });
  }
}