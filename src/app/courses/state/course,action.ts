import { createAction, props } from "@ngrx/store";
import { Course } from "../../models/course.model";

export const getCourses = createAction('getCourse');
export const createCourse = createAction('createCourse', props<{course: Course}>());
export const deleteCourse = createAction('deleteCourse', props<{value: number}>());
export const updateCourse = createAction('updateCourse', props<{course: Course}>());

