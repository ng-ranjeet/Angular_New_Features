import { Course } from "../../models/course.model";

export interface courseState {
    courses: Course[]
}

export const initialState: courseState = {
    courses: []
}