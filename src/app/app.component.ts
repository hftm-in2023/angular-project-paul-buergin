// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Beibehalten, falls benötigt
import { Observable } from 'rxjs'; // Kann entfernt werden, wenn nicht direkt verwendet
import { catchError, map } from 'rxjs/operators'; // <<< map HINZUFÜGEN!

// !!! PASSEN SIE DIESES INTERFACE EXAKT AN DIE JSON-STRUKTUR EINES EINZELNEN BLOG-EINTRAGS AN !!!
// Beispielstruktur für einen Eintrag: { id: "...", title: "...", author: "...", publishDate: "..." }
interface BlogEntry {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  // Fügen Sie hier weitere Felder hinzu, die in JEDEM einzelnen Blog-Eintrag enthalten sind
}

// NEUES INTERFACE für die gesamte Backend-Antwort (optional, aber gute Praxis)
interface BackendResponse {
  data: BlogEntry[];
  maxPageSize: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-blog';
  blogEntries: BlogEntry[] = []; // Array zum Speichern der Blog-Einträge
  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    console.log('📡 Anfrage an Backend startet: ' + this.apiUrl);
    // Ändern Sie den Typ des HTTP-Aufrufs zu BackendResponse
    this.http.get<BackendResponse>(this.apiUrl).pipe(
      // Fügen Sie den 'map'-Operator hinzu, um nur das 'data'-Array zu extrahieren
      map(response => response.data), // <<< HIER WIRD 'data' EXTRAHIERT
      catchError(error => {
        console.error('❌ Fehler beim Laden der Blog-Einträge:', error);
        return [];
      })
    ).subscribe({
      next: (data: BlogEntry[]) => { // Der Typ von 'data' ist jetzt BlogEntry[]
        this.blogEntries = data; // Daten direkt in das Array speichern
        console.log('✅ Backend-Antwort (direkt abonniert):', this.blogEntries);
        if (this.blogEntries.length === 0) {
          console.log('ℹ️ Empfangene Daten sind leer.');
        } else {
          console.log(`✅ ${this.blogEntries.length} Blog-Einträge erfolgreich geladen.`);
        }
      },
      error: (err) => console.error('❌ Fehler beim Abonnement:', err)
    });
  }
}