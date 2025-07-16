import { createReducer } from "@ngrx/store";
import { initialState } from "./course.state";

export const coursesReducer = createReducer(initialState);