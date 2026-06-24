import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../models/course.model';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
})
export class CourseDetails implements OnInit {

  course!: Course;
  courseId!: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse(): void {

    this.courseId = this.route.snapshot.paramMap.get('id')!;

    console.log('Course ID:', this.courseId);

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {

        this.course = res;
        this.loading = false;

        console.log('Course Data:', this.course);

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error:', err);

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}