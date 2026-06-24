import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseCard, MatButtonModule, MatIconModule],
  templateUrl: './courses-list.html',
  styleUrls: ['./courses-list.scss'],
})
export class CoursesList implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.cdr.detectChanges();

        console.log('COURSES', this.courses);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onEditCourse(course: Course) {
    this.router.navigate(['/courses/edit', course.id]);
  }
  onDetailsCourse(course: Course) {
    this.router.navigate(['/courses/details', course.id]);
  }

  onDeleteCourse(id: string) {
    if (!confirm('Are you sure?')) return;

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error('Delete error:', err);
      },
    });
  }
}
