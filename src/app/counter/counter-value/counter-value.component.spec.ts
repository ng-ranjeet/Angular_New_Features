import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterValueComponent } from './counter-value.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../courses/state/course.state';

describe('CounterValueComponent', () => {
  let component: CounterValueComponent;
  let fixture: ComponentFixture<CounterValueComponent>;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterValueComponent],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CounterValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
