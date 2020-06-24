import { TestBed, async, inject } from '@angular/core/testing';

import { StartGuardGuard } from './start-guard.guard';

describe('StartGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartGuardGuard]
    });
  });

  it('should ...', inject([StartGuardGuard], (guard: StartGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
