import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BlogDetailContainer } from './blog-detail.container';
import { RouterTestingModule } from '@angular/router/testing';
import { Blog } from '../shared/models/blog.model';

describe('BlogDetailContainer', () => {
  let component: BlogDetailContainer;
  let fixture: ComponentFixture<BlogDetailContainer>;
  let router: Router;

  const mockBlog: Blog = { 
    id: 1, title: 'Test Blog', author: 'Tester', publishDate: new Date().toISOString(), 
    content: 'Test Content', comments: [], createdAt: new Date().toISOString(), 
    createdByMe: false, likedByMe: false, likes: 10, updatedAt: new Date().toISOString() 
  };

  const mockActivatedRoute = {
    data: of({ blogEntry: mockBlog })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailContainer, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailContainer);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get blog data from route data and set state correctly', (done) => {
    component.state$.subscribe(state => {
      // Dieser Test wird mehrmals durchlaufen (wegen startWith), wir prüfen den Endzustand
      if (!state.isLoading) {
        expect(state.blog).toEqual(mockBlog);
        expect(state.errorMessage).toBeNull();
        done();
      }
    });
  });

  it('should navigate to home on goBack()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});