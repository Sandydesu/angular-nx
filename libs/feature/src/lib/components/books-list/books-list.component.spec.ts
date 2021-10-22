import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BehaviorSubject } from 'rxjs';

import { BookFacade } from '@myorg/data-access';
import { BookEntity, SharedModule } from '@myorg/shared';

import { BooksListComponent } from './books-list.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  const mockBookFacade = {
    allBook$: new BehaviorSubject<BookEntity[]>([]),
    loaded$: new BehaviorSubject(true),
    searchTerm$: new BehaviorSubject(''),
    error$: new BehaviorSubject<string | undefined>(undefined),
    search: jest.fn(),
    selectedBook: jest.fn(),
  };

  const router = {
    navigate: jest.fn(),
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
      imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
      ],
      declarations: [BooksListComponent],
      providers: [
        { provide: BookFacade, useValue: mockBookFacade },
        { provide: Router, useValue: router },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click on search button', () => {
    mockBookFacade.searchTerm$.next('testing');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const searchButton = compiled.querySelector('#searchButton') as HTMLElement;
    searchButton.click();

    expect(mockBookFacade.search).toHaveBeenCalledWith('testing');
  });

  it('should display info message when page loads', () => {
    mockBookFacade.loaded$.next(true);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const infoMessage = compiled.querySelector('.info-message');

    expect(infoMessage?.textContent).toEqual('Search books');
  });

  it('should display error message', () => {
    mockBookFacade.loaded$.next(true);
    mockBookFacade.error$.next('Something went wrong');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector('.error-message');

    expect(errorMessage?.textContent).toEqual('Something went wrong');
  });

  it('should display books', () => {
    const book = createBookEntity('TTT');
    mockBookFacade.loaded$.next(true);
    mockBookFacade.allBook$.next([book]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title')?.textContent).toEqual(
      book.title
    );
    expect(compiled.querySelector('#description')?.textContent?.trim()).toEqual(
      book.description
    );
  });

  it('should display books details when user click on book', () => {
    const book = createBookEntity('TTT');
    mockBookFacade.loaded$.next(true);
    mockBookFacade.allBook$.next([book]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const bookList = compiled.querySelector('#bookList') as HTMLElement;
    bookList.click();

    expect(mockBookFacade.selectedBook).toHaveBeenCalledWith(book.id);
    expect(router.navigate).toHaveBeenCalledWith(['/books', book.id]);
  });
});
