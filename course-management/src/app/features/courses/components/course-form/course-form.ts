import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
] , templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm {
selectedImage = '';
  selectedFile: File | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
   this.form = this.fb.group({
  courseName: [''],
  instructorName: [''],
  category: [''],
  duration: [0],
  price: [0],
  status: ['Active'],
  createdDate: [''],
  image: ['']
});
  }

onSubmit(): void {
  console.log(this.form.value);

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

    // حفظ اسم الصورة فقط
    this.form.patchValue({
      image: "/images/"+file.name
    });

    // معاينة الصورة
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
}