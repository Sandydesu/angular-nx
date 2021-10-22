import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { BookFacade } from '@myorg/data-access';
import { SidenavComponent, HeaderComponent } from '@myorg/shared';
import { BehaviorSubject } from 'rxjs';

import { FeatureComponent } from './feature.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  const mockBookFacade = {
    cartCount$: new BehaviorSubject<string>('0'),
    collectionCount$: new BehaviorSubject<string>('0'),
    loadCart: jest.fn(),
    loadCollections: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [FeatureComponent, HeaderComponent, SidenavComponent],
      providers: [{ provide: BookFacade, useValue: mockBookFacade }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display collection count and cart count on sidenav', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#collectionCount')?.textContent).toEqual(
      ' collections '
    );
    expect(compiled.querySelector('#cartCount')?.textContent).toEqual(
      ' shopping_cart '
    );
    expect(mockBookFacade.loadCart).toHaveBeenCalled();
    expect(mockBookFacade.loadCollections).toHaveBeenCalled();
  });
});
