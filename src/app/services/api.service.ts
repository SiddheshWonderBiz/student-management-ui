import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://localhost:7176/api";

  constructor(private http : HttpClient) {}

  //student endpoints
  getStudents():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Students`);
  }
  addStudent(student : any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Students`, student);
  }
  deleteStudent(id : number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Students/${id}`);
  }
  getStudentById(id : number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Students/${id}`);
  }
  updateStudent(id : number, student : any):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Students/${id}`, student);
  }


}
