import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  selector: 'app-course-form',
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
    MatIconModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm {

  selectedImage = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {

    this.form = this.fb.group({
      courseName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      instructorName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      category: [
        '',
        Validators.required
      ],

      duration: [
        null,
        [Validators.required, Validators.min(1)]
      ],

      price: [
        null,
        [Validators.required, Validators.min(0)]
      ],

      status: [
        'Active',
        Validators.required
      ],

      createdDate: [
        '',
        Validators.required
      ],

      image: [
        '',
        Validators.required
      ]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.courseService.addCourse(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file = input.files[0];

      this.form.patchValue({
        image: '/images/' + file.name
      });

      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}