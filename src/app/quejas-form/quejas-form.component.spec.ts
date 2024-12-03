import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuejasFormComponent } from './quejas-form.component';

describe('QuejasFormComponent', () => {
  let component: QuejasFormComponent;
  let fixture: ComponentFixture<QuejasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuejasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuejasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
