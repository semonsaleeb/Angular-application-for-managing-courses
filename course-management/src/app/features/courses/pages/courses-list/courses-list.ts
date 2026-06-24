import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../models/course.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './courses-list.html',
  styleUrls: ['./courses-list.scss']
})
export class CoursesList implements OnInit {

  courses: Course[] = [];


constructor(
  private courseService: CourseService,
  private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  this.courseService.getCourses().subscribe(res => {
    this.courses = res;
    this.cdr.detectChanges();

    console.log('COURSES', this.courses.length);
  });
}
}