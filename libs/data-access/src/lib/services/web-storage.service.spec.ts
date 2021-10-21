import { TestBed } from '@angular/core/testing';

import { WebStorageService } from './web-storage.service';

describe('WebStorageService', () => {
  let service: WebStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get values from localstorage', () => {
    service.setItem('One', 'A');
    const value = service.getItem('One');
    expect(value).toEqual('A');
  });
});
