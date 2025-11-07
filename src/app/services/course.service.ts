import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private apiUrl = "https://localhost:7176/api";

  constructor(private http : HttpClient) { }

  //course endpoints
  getCourses():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Courses`);
  }
  addCourse(course : any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Courses`, course);
  }
  deleteCourse(id : number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Courses/${id}`);
  }
  getCourseById(id : number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Courses/${id}`);
  }
  updateCourse(id : number, course : any):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Courses/${id}`, course);
  }

}
