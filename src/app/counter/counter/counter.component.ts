import { Component } from '@angular/core';
import { CounterButtonComponent } from "../counter-button/counter-button.component";
import { CounterValueComponent } from "../counter-value/counter-value.component";

@Component({
  selector: 'app-counter',
  imports: [CounterButtonComponent, CounterValueComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

}
