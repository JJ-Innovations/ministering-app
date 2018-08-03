import { TestBed, inject } from '@angular/core/testing';

import { NerdService } from './nerd.service';

describe('NerdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NerdService]
    });
  });

  it('should be created', inject([NerdService], (service: NerdService) => {
    expect(service).toBeTruthy();
  }));
});
