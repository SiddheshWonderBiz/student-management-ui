import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Enrollment {
  id?: number;
  studentId: number;
  courseId: number;
  grade?: number;
  student?: {
    id: number;
    fullName: string;
    email: string;
  };
  course?: {
    courseId: number;
    courseName: string;
    credits: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = "https://localhost:7176/api";
  constructor(private http:HttpClient) { }

  //enrollment endpoints
  getEnrollments():Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/Enrollments`);
  }
  addEnrollment(enrollment : Enrollment):Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/Enrollments`, enrollment);
  }
  deleteEnrollment(id : number):Observable<Enrollment> {
    return this.http.delete<Enrollment>(`${this.apiUrl}/Enrollments/${id}`);
  }
  getEnrollmentById(id : number):Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/Enrollments/${id}`);
  }
  updateEnrollment(id : number, enrollment : Enrollment):Observable<Enrollment> { 
    return this.http.put<Enrollment>(`${this.apiUrl}/Enrollments/${id}`, enrollment);
  }
  
}
