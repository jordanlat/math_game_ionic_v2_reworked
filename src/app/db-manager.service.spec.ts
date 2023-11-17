import { TestBed } from '@angular/core/testing';

import { DbManagerService } from './db-manager.service';

describe('DbManagerService', () => {
  let service: DbManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
