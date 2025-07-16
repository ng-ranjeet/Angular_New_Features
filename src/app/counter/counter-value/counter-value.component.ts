import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../counter-state/counter.state';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { getCounterSelector } from '../counter-state/counter.selector';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-counter-value',
  imports: [AsyncPipe],
  templateUrl: './counter-value.component.html',
  styleUrl: './counter-value.component.scss'
})
export class CounterValueComponent implements OnInit{
  @Input({required: true}) counter: number | undefined;

  private store = inject(Store<AppState>);
  count$: Observable<number> | undefined;
  constructor() {

  }
  ngOnInit(){
     this.count$ = this.store.select(getCounterSelector);
  }

}
