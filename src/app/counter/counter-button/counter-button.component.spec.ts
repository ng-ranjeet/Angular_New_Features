import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterButtonComponent } from './counter-button.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../courses/state/course.state';

describe('CounterButtonComponent', () => {
  let component: CounterButtonComponent;
  let fixture: ComponentFixture<CounterButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterButtonComponent],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CounterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
