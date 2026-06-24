import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  searchText = '';

  courses: any[] = [];
  filteredCourses: any[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onSearch(term: string) {
    this.filteredCourses = this.courses.filter(course =>
      course.courseName
        .toLowerCase()
        .includes(term.toLowerCase())
    );
  }

  openCourse(id: string) {
    this.router.navigate(['/courses/details', id]);

    this.searchText = '';
    this.filteredCourses = [];
  }
}