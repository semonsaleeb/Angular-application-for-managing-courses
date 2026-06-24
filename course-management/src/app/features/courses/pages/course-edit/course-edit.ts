import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from '../../../../core/services/course.service';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './course-edit.html',
  styleUrl: './course-edit.scss',
})
export class CourseEdit implements OnInit {
  form!: FormGroup;
  selectedImage = '';
  courseId!: string;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.form = this.fb.group({
      courseName: [''],
      instructorName: [''],
      category: [''],
      duration: [0],
      price: [0],
      status: ['Active'],
      createdDate: [''],
      image: [''],
      imageUrl: ['']
    });

    this.loadCourse();
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course: any) => {
        this.form.patchValue({
          courseName: course.courseName,
          instructorName: course.instructorName,
          category: course.category,
          duration: course.duration,
          price: course.price,
          status: course.status,
          createdDate: course.createdDate
            ? new Date(course.createdDate)
            : '',
          image: course.image,
          imageUrl: course.imageUrl
        });

        this.selectedImage = course.imageUrl || course.image;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    const body = {
      ...this.form.value,

      // تأكيد تحديث الحقلين بنفس القيمة
      image: this.form.value.imageUrl,
      imageUrl: this.form.value.imageUrl
    };

    this.courseService.updateCourse(this.courseId, body).subscribe({
      next: () => {
        console.log('Course updated successfully');
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];
    const imagePath = `/images/${file.name}`;

    this.form.patchValue({
      image: imagePath,
      imageUrl: imagePath
    });

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}