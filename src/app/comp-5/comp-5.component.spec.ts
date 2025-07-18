import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp5Component } from './comp-5.component';

describe('Comp5Component', () => {
  let component: Comp5Component;
  let fixture: ComponentFixture<Comp5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comp5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comp5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
