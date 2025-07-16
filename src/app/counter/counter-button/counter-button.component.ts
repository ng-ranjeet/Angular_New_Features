import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { customaction, decrement, increment, reset } from '../counter-state/counter.action';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-counter-button',
  imports: [MatButtonModule],
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss'
})
export class CounterButtonComponent {
  
  private store = inject(Store<AppState>)

  increment(){
    this.store.dispatch(increment());
  }
  decrement(){
     this.store.dispatch(decrement());
  }

  reset(){
     this.store.dispatch(reset());
  }

  incrementBy(){
     this.store.dispatch(customaction({value: 10}));
  }

}
