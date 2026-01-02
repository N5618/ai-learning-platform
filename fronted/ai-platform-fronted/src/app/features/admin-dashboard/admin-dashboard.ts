import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LessonView } from '../dashboard/lesson-view/lesson-view';
import { Prompt } from '../../core/models/learning.model';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LessonView],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  allLessons: Prompt[] = [];
  filteredLessons: Prompt[] = [];
  selectedPrompt: Prompt | null = null;
  
  // Simple filters
  userNameFilter = '';
  categoryFilter = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.apiService.getAllPromptsAdmin().subscribe({
      next: (response: any) => {
        console.log('Server response received:', response);
        
        this.allLessons = response.data || response;
        this.filteredLessons = [...this.allLessons];
        
        console.log('allLessons updated, length:', this.allLessons.length);
      },
      error: (err: any) => console.error('Error loading history', err)
    });
  }

  onFilterChange() {
    this.filteredLessons = this.allLessons.filter(lesson => {
      const matchesUser = !this.userNameFilter || 
        lesson.user_id?.name?.toLowerCase().includes(this.userNameFilter.toLowerCase());
      const matchesCategory = !this.categoryFilter || 
        lesson.category_id?.name?.toLowerCase().includes(this.categoryFilter.toLowerCase());
      
      return matchesUser && matchesCategory;
    });
  }
  selectPrompt(prompt: Prompt) {
    console.log('Selected prompt:', prompt);
    this.selectedPrompt = prompt;
  }
}