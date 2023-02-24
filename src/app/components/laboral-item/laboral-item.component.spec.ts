import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboralItemComponent } from './laboral-item.component';

describe('LaboralItemComponent', () => {
  let component: LaboralItemComponent;
  let fixture: ComponentFixture<LaboralItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboralItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboralItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
