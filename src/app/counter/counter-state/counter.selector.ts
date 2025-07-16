import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterState } from "./counter.state";

const getSelector = createFeatureSelector<counterState>('counter');

export const getCounterSelector = createSelector(getSelector, (state) =>{
    return state.counter;
})