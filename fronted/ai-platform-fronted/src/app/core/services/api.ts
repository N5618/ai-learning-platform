import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, SubCategory, Category, CreatePromptDTO, Prompt, ApiResponse } from '../models/learning.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { 
    
  }

  register(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users/register`, user)
   
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/users/${id}`)
      .pipe(map(res => res.data));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>(`${this.baseUrl}/categories`)
    .pipe(map(response => response.data))
  }

getSubCategoriesByCategory(categoryId: string): Observable<SubCategory[]> {
  return this.http.get<ApiResponse<SubCategory[]>>(`${this.baseUrl}/categories/${categoryId}/subs/`)
    .pipe(map(res => res.data)
    );
}

  sendPrompt(dto: CreatePromptDTO): Observable<Prompt> {
    return this.http.post<ApiResponse<Prompt>>(`${this.baseUrl}/prompts/generate/`, dto)
      .pipe(map(response => response.data))
  }
getHistoryById(userId: string): Observable<Prompt[]> {
    return this.http.get<ApiResponse<Prompt[]>>(`${this.baseUrl}/prompts/history/${userId}`)
      .pipe(map(res => res.data));
  }

  getAllPromptsAdmin(): Observable<Prompt[]> {
    return this.http.get<ApiResponse<Prompt[]>>(`${this.baseUrl}/prompts/admin/all`)
      .pipe(map(res => res.data));
  }





}
