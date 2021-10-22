import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';

import { BehaviorSubject } from 'rxjs';

import { BookEntity, SharedModule } from '@myorg/shared';
import { BookFacade } from '@myorg/data-access';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const location = {
    back: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };
  const mockBookFacade = {
    cartList$: new BehaviorSubject<BookEntity[]>([]),
    addCartItemsToBuyNow: jest.fn(),
    removeItemFromCart: jest.fn(),
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
        MatIconModule,
        FlexLayoutModule,
      ],
      declarations: [CartComponent],
      providers: [
        { provide: BookFacade, useValue: mockBookFacade },
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click on back it navigates to back', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const backButton = compiled.querySelector('#backButton') as HTMLElement;
    backButton.click();

    expect(location.back).toHaveBeenCalled();
  });

  it('should click on buynow user navigates to buynow page', () => {
    const book = createBookEntity('EEE');
    mockBookFacade.cartList$.next([book]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buyNowButton = compiled.querySelector('#buyNowButton') as HTMLElement;
    buyNowButton.click();

    expect(mockBookFacade.addCartItemsToBuyNow).toHaveBeenCalled();
  });

  it('should remove book from cart list', () => {
    const book = createBookEntity('EEE');
    mockBookFacade.cartList$.next([book]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buyNowButton = compiled.querySelector('#removeButton') as HTMLElement;
    buyNowButton.click();

    expect(mockBookFacade.removeItemFromCart).toHaveBeenCalledWith(book);
  });
});
