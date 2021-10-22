import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BookFacade } from '@myorg/data-access';
import { SharedModule } from '@myorg/shared';
import { BehaviorSubject } from 'rxjs';

import { FeatureComponent } from './feature.component';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  const mockBookFacade = {
    cartCount$: new BehaviorSubject(0),
    collectionCount$: new BehaviorSubject(0),
    loadCart: jest.fn(),
    loadCollections: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [FeatureComponent],
      providers: [{ provide: BookFacade, useValue: mockBookFacade }],
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
      ' collections 0'
    );
    expect(compiled.querySelector('#cartCount')?.textContent).toEqual(' shopping_cart 0');
    expect(mockBookFacade.loadCart).toHaveBeenCalled();
    expect(mockBookFacade.loadCollections).toHaveBeenCalled();
  });
});
