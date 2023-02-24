import { TestBed } from '@angular/core/testing';

import { EditUsuarioService } from './edit-usuario.service';

describe('EditUsuarioService', () => {
  let service: EditUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
