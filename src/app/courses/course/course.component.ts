import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course',
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  defaultImage = 'https://via.placeholder.com/300x160?text=No+Image';
  searchText: string = '';
   courses: Course[] = [
    {
      id: 1,
      title: 'Angular Basics',
      description: 'Learn the core concepts of Angular framework.',
      image: '/assets/logo/angular.png'
    },
    {
      id: 2,
      title: 'Reactive Programming with RxJS',
      description: 'Dive deeper into RxJS, NgRx, and performance optimization.',
      image: '/assets/logo/rxjs.png'
    },
    {
      id: 3,
      title: 'Node.js API Development',
      description: 'Build RESTful APIs with Express.js and MongoDB.',
      image: '/assets/logo/nodejsLight.svg'
    },
    {
      id: 4,
      title: 'TypeScript for Angular',
      description: 'Master TypeScript features and best practices for Angular development.',
      image: '/assets/logo/Typescript.svg.png'
    },
    {
      id: 5,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced topics like lazy loading, dynamic components, and more.',
      image: '/assets/logo/ngrx.svg'
    },
    {
      id: 6,
      title: 'Angular Material Design',
      description: 'Implement Material Design components in your Angular applications.',
      image: '/assets/logo/angular-material.png'
    }
  ];

  get filteredCourses(): Course[] {
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
