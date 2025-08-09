import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { Blog } from '../shared/models/blog.schema';
import { BlogDisplayComponent } from './components/blog-display/blog-display.component';

// Definiert die Form des Zustands-Objekts
interface BlogDetailState {
  blog: Blog | null;
  isLoading: boolean;
  errorMessage: string | null;
}

@Component({
  selector: 'app-blog-detail-container',
  standalone: true,
  imports: [CommonModule, BlogDisplayComponent],
  templateUrl: './blog-detail.container.html',
  styleUrls: ['./blog-detail.container.scss']
})
export class BlogDetailContainer {
  
  public state$: Observable<BlogDetailState>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.state$ = this.route.data.pipe(
      // Erfolgsfall: Daten vom Resolver sind da
      map(data => ({ blog: data['blogEntry'], isLoading: false, errorMessage: null })),
      // Startzustand: Wird sofort ausgegeben, um "Lade..." anzuzeigen
      startWith({ blog: null, isLoading: true, errorMessage: null }),
      // Fehlerfall: Fängt Fehler vom Resolver ab
      catchError((error: Error) => of({ blog: null, isLoading: false, errorMessage: 'Blog-Eintrag konnte nicht geladen werden.' }))
    );
  }

  // Reagiert auf das Event der Dumb-Komponente
  public goBack(): void {
    this.router.navigate(['/']); // Navigiert zur Übersicht
  }
}