import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from '../../../shared/models/blog.schema';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  // Empfängt die Daten für EINEN Blog vom Smart-Container.
  // Das '!' sagt TypeScript, dass dieser Input immer von aussen gesetzt wird.
  @Input() blog!: Blog; 

  // Sendet die ID des Blogs, wenn der Benutzer auf "Details" klickt.
  @Output() viewDetails = new EventEmitter<string | number>();

  onViewDetails(): void {
    this.viewDetails.emit(this.blog.id);
  }
}