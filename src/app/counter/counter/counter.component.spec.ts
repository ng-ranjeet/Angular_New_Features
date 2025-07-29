import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { CounterButtonComponent } from '../counter-button/counter-button.component';
import { CounterValueComponent } from '../counter-value/counter-value.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent, CounterButtonComponent, CounterValueComponent],
       providers: [provideMockStore()] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
