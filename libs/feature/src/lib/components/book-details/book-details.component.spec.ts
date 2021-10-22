import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { BookFacade } from '@myorg/data-access';
import { BookEntity, SharedModule } from '@myorg/shared';

import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  const location = {
    back: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };
  const mockBookFacade = {
    selectedBook$: new Subject(),
    addToCart: jest.fn(),
    addItemTobuyNow: jest.fn(),
  };

  const createBookEntity = (id: string): BookEntity => ({
    id,
    title: 'Angular Test',
    authors: ['A', 'B'],
    description: 'Something',
    publisher: 'AB',
    publishedDate: '22-10-2099',
    coverUrl: 'https://ilovemyworld.com/laugh.png',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: BookFacade, useValue: mockBookFacade },
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
      ],
      declarations: [BookDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to back when selected book not available', () => {
    mockBookFacade.selectedBook$.next(null);
    expect(router.navigate).toHaveBeenCalledWith(['/book']);
  });

  it('should display book details', () => {
    const book = createBookEntity('test');
    mockBookFacade.selectedBook$.next(book);

    expect(component.book.id).toEqual('test');
  });

  it('should render book details', () => {
    const book = createBookEntity('test');
    mockBookFacade.selectedBook$.next(book);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title')?.textContent).toEqual(
      book.title
    );
    expect(compiled.querySelector('#description')?.textContent?.trim()).toEqual(
      book.description
    );
  });

  it('should navigate back when user click on back button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#backButton') as HTMLElement;
    backButton.click();

    expect(location.back).toHaveBeenCalled();
  });

  it('should add a book to cart', () => {
    const book = createBookEntity('test');
    mockBookFacade.selectedBook$.next(book);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#addToCart') as HTMLElement;
    backButton.click();

    expect(mockBookFacade.addToCart).toHaveBeenCalledWith(book);
  });

  it('should navigate to buynow page', () => {
    const book = createBookEntity('test');
    mockBookFacade.selectedBook$.next(book);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#buyNowButton') as HTMLElement;
    backButton.click();

    expect(mockBookFacade.addItemTobuyNow).toHaveBeenCalledWith(book);
    expect(router.navigate).toHaveBeenCalledWith(['/buyNow']);
  });
});
