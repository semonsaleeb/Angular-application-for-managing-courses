import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../../features/courses/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  addCourse(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  updateCourse(id: string, formData: FormData) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      formData
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}