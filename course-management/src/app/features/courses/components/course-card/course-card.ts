import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  @Input() course!: Course;

 @Output() edit = new EventEmitter<Course>();
@Output() delete = new EventEmitter<string>();

onEdit() {
  this.edit.emit(this.course);
}

onDelete() {
   console.log(this.course.id);
  this.delete.emit(this.course.id);
}
}