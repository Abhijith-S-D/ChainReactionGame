import { TestBed } from '@angular/core/testing';

import { CellSetupService } from './cell-setup.service';

describe('CellSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CellSetupService = TestBed.get(CellSetupService);
    expect(service).toBeTruthy();
  });
});
