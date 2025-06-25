// src/app/blog-detail/blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http'; // <<< DIESEN IMPORT ENTFERNEN!
import { CommonModule } from '@angular/common';

// RxJS Imports (of und switchMap werden hier nicht mehr direkt benötigt, da der Resolver es macht)
// import { Observable, of } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';

// Angepasstes BlogEntry-Interface (wie wir es zuletzt definiert haben)
interface BlogEntry {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  content: string;
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
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blogEntry: BlogEntry | undefined;
  // isLoading sollte hier direkt auf false gesetzt werden, da Resolver die Daten vorher lädt
  isLoading = false; // <<< WICHTIG: Standardwert ist jetzt false
  errorMessage: string | undefined;

  // HttpClient wird hier nicht mehr benötigt, da der Resolver ihn nutzt
  constructor(
    private route: ActivatedRoute,
    // private http: HttpClient, // <<< DIESEN PARAMETER ENTFERNEN!
    private router: Router
  ) {}

  ngOnInit(): void {
    // Hier abonnieren Sie die 'data' Observable, das die vom Resolver geladenen Daten enthält.
    this.route.data.subscribe(data => {
      // 'blogEntry' ist der Schlüssel, den Sie im resolve-Block in app.routes.ts vergeben haben
      this.blogEntry = data['blogEntry'];

      if (!this.blogEntry) {
        // Dies wird ausgeführt, wenn der Resolver null oder undefined zurückgegeben hat (z.B. bei Fehler oder 404)
        this.errorMessage = 'Blog-Eintrag konnte nicht geladen oder gefunden werden.';
        // Optional: Hier könnten Sie auch automatisch zurück zur Liste navigieren,
        // aber der Resolver tut das im Fehlerfall bereits, bevor die Komponente geladen wird.
        // Wenn Sie möchten, dass diese Komponente die Fehlermeldung anzeigt, stellen Sie sicher,
        // dass der Resolver im Fehlerfall NICHT navigiert, sondern nur 'of(null)' zurückgibt.
      } else {
        console.log('✅ Blog-Details vom Resolver geladen:', this.blogEntry);
      }
      this.isLoading = false; // Laden ist beendet, da Resolver seine Arbeit getan hat
    });

    // <<< DEN GESAMTEN ALTEN HTTP-REQUEST-CODE HIER ENTFERNEN! >>>
    // Denken Sie an den gesamten 'this.route.paramMap.pipe(...).subscribe(...)' Block.
  }

  goToAllBlogs(): void {
    this.router.navigate(['/']);
  }
}