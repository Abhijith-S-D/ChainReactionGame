import { TestBed } from '@angular/core/testing';

import { ColorDataServiceService } from './color-data-service.service';

describe('ColorDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorDataServiceService = TestBed.get(ColorDataServiceService);
    expect(service).toBeTruthy();
  });
});
