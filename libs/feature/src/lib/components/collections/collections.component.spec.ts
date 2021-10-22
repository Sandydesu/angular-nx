import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject } from 'rxjs';

import { BookFacade } from '@myorg/data-access';
import { BookEntity, SharedModule } from '@myorg/shared';

import { CollectionsComponent } from './collections.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;
  const createBookEntity = (id: string): BookEntity => ({
    id,
    title: 'Angular Test',
    authors: ['A', 'B'],
    description: 'Something',
    publisher: 'AB',
    publishedDate: '22-10-2099',
    coverUrl: 'https://ilovemyworld.com/laugh.png',
  });
  const personInformation = {
    name: 'Test',
    phone: '(111) 111-1111',
    email: 'test@test.com',
    address: 'hyd',
  };
  const mockBookFacade = {
    collectionList$: new BehaviorSubject([
      {
        ...personInformation,
        items: [createBookEntity('AAA')],
      },
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
      ],
      declarations: [CollectionsComponent],
      providers: [{ provide: BookFacade, useValue: mockBookFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should displaying collection', () => {
    const book = createBookEntity('AAA');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#name')?.textContent).toEqual(
      `Name :  ${personInformation.name}`
    );

    expect(compiled.querySelector('#email')?.textContent).toEqual(
      `Email :  ${personInformation.email}`
    );

    expect(compiled.querySelector('mat-card-title')?.textContent).toEqual(
      book.title
    );
    expect(compiled.querySelector('#description')?.textContent?.trim()).toEqual(
      book.description
    );
  });
});
