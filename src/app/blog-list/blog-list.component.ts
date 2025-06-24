// src/app/blog-list/blog-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Wichtig für [routerLink] im Template
import { FormsModule } from '@angular/forms'; // Beibehalten, wenn FormsModule hier benötigt wird

import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; // Import 'of' if you use it for error handling, or just remove 'of' if not needed

// Interface für einen einzelnen Blog-Eintrag (an Backend-Struktur anpassen)
interface BlogEntry {
  id: number; // <--- WICHTIG: Hier auf 'number' ändern!
  title: string;
  author: string;
  createdAt: string;
  // Fügen Sie hier weitere Felder hinzu, die in der Listenansicht benötigt werden
  // wie z.B. eine kurze Zusammenfassung (falls vorhanden)
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
  styleUrls: ['./blog-list.component.scss'] // Stil-Datei für diese Komponente
})
export class BlogListComponent implements OnInit {
  title = 'Blog-Übersicht'; // Titel für die Listenansicht
  blogEntries: BlogEntry[] = [];
  isLoading = true;
  errorMessage: string | undefined;

  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    console.log('📡 Anfrage an Backend startet: ' + this.apiUrl);
    this.isLoading = true;
    this.errorMessage = undefined;
    this.http.get<BackendResponse>(this.apiUrl).pipe(
      map(response => response.data), // Extrahieren Sie das 'data'-Array aus der Antwort
      catchError(error => {
        console.error('❌ Fehler beim Laden der Blog-Einträge:', error);
        this.errorMessage = 'Fehler beim Laden der Blog-Einträge. Bitte versuchen Sie es später erneut.';
        this.isLoading = false;
        return of([]); // Geben Sie ein leeres Array zurück, um den Fehler zu handhaben
      })
    ).subscribe({
      next: (data: BlogEntry[]) => {
        this.blogEntries = data;
        this.isLoading = false;
        console.log('✅ Backend-Antwort (direkt abonniert):', this.blogEntries);
        if (this.blogEntries.length === 0) {
          this.errorMessage = 'Keine Blog-Einträge gefunden.';
        }
      },
      error: () => {
        // Dieser Fehler-Callback wird nur ausgelöst, wenn catchError den Observable NICHT umwandelt
        // Da wir 'of([])' in catchError verwenden, wird dieser Teil selten erreicht,
        // außer bei wirklich unvorhergesehenen RxJS-Fehlern nach dem catchError.
        // Die Fehlermeldung wird primär durch den errorMessage gesetzt, der in catchError definiert wird.
      },
      complete: () => {
        console.log('🏁 Ladevorgang für Blog-Einträge abgeschlossen.');
      }
    });
  }
}