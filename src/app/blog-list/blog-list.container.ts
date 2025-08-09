import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { Blog } from '../shared/models/blog.schema';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogService } from '../core/services/blog.service'; // Annahme: Du erstellst einen BlogService

// Definiert den Zustand der Listenansicht
interface BlogListState {
  blogs: Blog[];
  isLoading: boolean;
  errorMessage: string | null;
}

@Component({
  selector: 'app-blog-list-container',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blog-list.container.html',
  styleUrls: ['./blog-list.container.scss']
})
export class BlogListContainer implements OnInit {
  title = 'Angular Blog';
  public state$!: Observable<BlogListState>;

  // Ein zentraler BlogService sollte den HttpClient kapseln
  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.state$ = this.blogService.getBlogs().pipe(
      map(blogs => ({ blogs: blogs, isLoading: false, errorMessage: null })),
      startWith({ blogs: [], isLoading: true, errorMessage: null }),
      catchError(error => of({ blogs: [], isLoading: false, errorMessage: 'Fehler beim Laden der Blog-Einträge.' }))
    );
  }

  navigateToDetail(id: string | number): void {
    this.router.navigate(['/detail', id]);
  }
}