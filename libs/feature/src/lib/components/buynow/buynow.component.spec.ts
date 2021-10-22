import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { BehaviorSubject } from 'rxjs';

import { BookEntity, SharedModule } from '@myorg/shared';
import { BookFacade } from '@myorg/data-access';

import { BuynowComponent } from './buynow.component';

describe('BuynowComponent', () => {
  let component: BuynowComponent;
  let fixture: ComponentFixture<BuynowComponent>;

  const location = {
    back: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };
  const mockBookFacade = {
    buynowList$: new BehaviorSubject<BookEntity[] | undefined>([]),
    isCart$: new BehaviorSubject(false),
    addToCollection: jest.fn(),
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
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
      declarations: [BuynowComponent],
      providers: [
        FormBuilder,
        { provide: BookFacade, useValue: mockBookFacade },
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of books in book now page', () => {
    const book = createBookEntity('AAA');
    mockBookFacade.buynowList$.next([book]);
    mockBookFacade.isCart$.next(true);

    expect(component.books.length).toEqual(1);
  });

  it('should navigate to books page when books are not available', () => {
    mockBookFacade.buynowList$.next(undefined);

    expect(router.navigate).toHaveBeenCalledWith(['/book']);
  });

  it('should click on back it navigates to back', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#backButton') as HTMLElement;
    backButton.click();

    expect(location.back).toHaveBeenCalled();
  });

  it('should click on buyNow created a collection and navigate to collection page', () => {
    const book = createBookEntity('AAA');
    const personInformation = {
      name: 'Test',
      phone: '(111) 111-1111',
      email: 'test@test.com',
      address: 'hyd',
    };
    mockBookFacade.buynowList$.next([book]);
    mockBookFacade.isCart$.next(true);

    component.buyNowForm.patchValue(personInformation);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#buyNowButton') as HTMLElement;
    backButton.click();

    expect(mockBookFacade.addToCollection).toHaveBeenCalledWith(
      {
        ...personInformation,
        items: [book],
      },
      true
    );
  });
});
