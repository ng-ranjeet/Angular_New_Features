import { createReducer, on } from '@ngrx/store';
import { customaction, decrement, increment, reset } from './counter.action';

export const initialState = {
   counter: 0
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
        ...state,
        counter: state.counter +1
    }
  }),
  on(decrement, (state) =>{
     return {
        ...state,
        counter: state.counter - 1
    }
  }),
  on(reset, (state) => {
     return {
        ...state,
        counter: 0
    }
  }),
  on(customaction,(state, payload) => {
     return {
        ...state,
        counter: state.counter + payload.value
    }
  })
);