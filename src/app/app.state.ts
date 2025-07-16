import { counterReducer } from "./counter/counter-state/counter.reducer";
import { coursesReducer } from "./courses/state/course.reducer";
import { counterState } from "./counter/counter-state/counter.state";
import { courseState } from "./courses/state/course.state";

export interface AppState  {
    counter: counterState,
    courses: courseState
}

export const AppReducer = {
 counter: counterReducer,
 courses: coursesReducer
}