// src/app/blog-detail/blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// RxJS Imports
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

// Angepasstes BlogEntry-Interface (wie wir es zuletzt definiert haben)
interface BlogEntry {
  id: number; // <--- HIER MUSS ES 'number' SEIN!
  title: string;
  author: string;
  publishDate: string;
  content: string; // <--- Sicherstellen, dass dieses Feld vorhanden ist
  comments: any[];
  createdAt: string;
  createdByMe: boolean;
  likedByMe: boolean;
  likes: number;
  updatedAt: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'] // Stil-Datei für diese Komponente
})
export class BlogDetailComponent implements OnInit {
  blogEntry: BlogEntry | undefined;
  isLoading = true;
  errorMessage: string | undefined;

  private apiUrl = '/api/entries';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true;
        this.errorMessage = undefined;
        const id = params.get('id'); // ID kommt als String aus der URL
        if (id) {
          console.log(`📡 Lade Blog-Details für ID: ${id}`);
          // Konvertiere die String-ID in eine Zahl für die Backend-Anfrage
          const numericId = parseInt(id, 10);
          if (isNaN(numericId)) {
            console.error('❌ Ungültige ID im URL-Parameter:', id);
            this.errorMessage = 'Ungültige Blog-ID.';
            this.isLoading = false;
            return of(undefined);
          }

          // Jetzt direkt ein BlogEntry-Objekt erwarten (kein .data-Feld im Backend!)
          return this.http.get<BlogEntry>(`${this.apiUrl}/${numericId}`).pipe(
            catchError(error => {
              console.error('❌ Fehler beim Laden der Blog-Details:', error);
              this.errorMessage = 'Fehler beim Laden der Details. Bitte versuchen Sie es später erneut.';
              this.isLoading = false;
              return of(undefined); // Gibt 'undefined' zurück, um den Fehlerfluss zu beenden
            })
          );
        } else {
          this.errorMessage = 'Keine Blog-ID in der URL gefunden.';
          this.isLoading = false;
          return of(undefined);
        }
      })
    ).subscribe(entry => {
      this.blogEntry = entry;
      this.isLoading = false;
      if (!this.blogEntry) {
        this.errorMessage = this.errorMessage || 'Blog-Eintrag nicht gefunden.';
      } else {
        console.log('✅ Blog-Details geladen:', this.blogEntry);
      }
    });
  }

  goToAllBlogs(): void {
    this.router.navigate(['/']);
  }
}