import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './courses-list.html',
})
export class CoursesList implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        console.log('DATA:', res); // 👈 مهم جدًا
        this.courses = res;
      },
      error: (err) => {
        console.error('ERROR:', err);
      }
    });
  }
}