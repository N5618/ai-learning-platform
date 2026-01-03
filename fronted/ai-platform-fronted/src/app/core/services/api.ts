import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, SubCategory, Category, CreatePromptDTO, Prompt, ApiResponse } from '../models/learning.model';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {

  }

 register(userData: any) {
  return this.http.post<any>(`${this.baseUrl}/users/register`, userData).pipe(
    tap(response => {
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      }
    })
  );
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
  getHistoryById(userId: string): Observable<ApiResponse<Prompt[]>> {
    return this.http.get<ApiResponse<Prompt[]>>(`${this.baseUrl}/prompts/history/${userId}`)

  }

  getAllPromptsAdmin(page: number = 1, limit: number = 1000, search: string = ''): Observable<ApiResponse<Prompt[]>> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      httpParams = httpParams.set('search', search);
    }

    console.log('Sending request to admin/all with params:', httpParams.toString());

    return this.http.get<ApiResponse<Prompt[]>>(`${this.baseUrl}/prompts/admin/all/`, {
      params: httpParams
  })




}}

