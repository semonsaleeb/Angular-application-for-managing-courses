import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';

import { Sidebar } from '../../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CourseCard,
    MatButtonModule,
    MatIconModule,
    Sidebar,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
  ],
  templateUrl: './courses-list.html',
  styleUrls: ['./courses-list.scss'],
})
export class CoursesList implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = [...res];

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onStatusFilter(status: string) {
    if (status === 'all') {
      this.filteredCourses = [...this.courses];
      return;
    }

    this.filteredCourses = this.courses.filter(
      (course) =>
        course.status?.toLowerCase() === status.toLowerCase()
    );
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
        this.filteredCourses = this.filteredCourses.filter(
          (course) => course.id !== id
        );

        this.courses = this.courses.filter(
          (course) => course.id !== id
        );
      },
      error: (err) => {
        console.error('Delete error:', err);
      },
    });
  }
}