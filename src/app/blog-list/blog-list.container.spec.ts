import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BlogListContainer } from './blog-list.container';
import { BlogService } from '../core/services/blog.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogListContainer', () => {
  let component: BlogListContainer;
  let fixture: ComponentFixture<BlogListContainer>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let router: Router;

  beforeEach(async () => {
    // Erstellt einen Mock-Service mit einer getBlogs-Methode
    mockBlogService = jasmine.createSpyObj('BlogService', ['getBlogs']);
    
    await TestBed.configureTestingModule({
      imports: [BlogListContainer, RouterTestingModule],
      providers: [
        { provide: BlogService, useValue: mockBlogService }
      ]
    }).compileComponents();

    // Der Mock gibt ein leeres Array zurück als Standard
    mockBlogService.getBlogs.and.returnValue(of([]));

    fixture = TestBed.createComponent(BlogListContainer);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges(); // ngOnInit wird aufgerufen
    expect(component).toBeTruthy();
  });

  it('should call getBlogs on init', () => {
    fixture.detectChanges();
    expect(mockBlogService.getBlogs).toHaveBeenCalled();
  });

  it('should navigate to detail view on navigateToDetail', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const blogId = '123';
    component.navigateToDetail(blogId);
    expect(navigateSpy).toHaveBeenCalledWith(['/detail', blogId]);
  });
});