import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from '../../../shared/models/blog.model'; // Annahme: Model-Datei existiert

@Component({
  selector: 'app-blog-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Optimiert die Performance
})
export class BlogDisplayComponent {
  // @Input: Empfängt den kompletten Zustand von der Smart-Komponente
  @Input() isLoading: boolean | null = true;
  @Input() errorMessage: string | null = null;
  @Input() blog: Blog | null = null;

  // @Output: Sendet ein Ereignis, wenn der Benutzer zurück navigieren will
  @Output() navigateBack = new EventEmitter<void>();

  // Wird vom Button-Klick im Template aufgerufen
  onNavigateBack(): void {
    this.navigateBack.emit();
  }
}