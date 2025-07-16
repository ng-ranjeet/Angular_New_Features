import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    { path: 'courses', loadComponent: () => import('./courses/course/course.component').then(m => m.CourseComponent) },
];
