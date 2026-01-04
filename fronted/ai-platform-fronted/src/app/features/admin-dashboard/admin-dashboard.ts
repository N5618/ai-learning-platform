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
        console.log('Server response:', response);

        // כאן התיקון הקריטי:
        // לפי הלוג שלך, המערך נמצא בתוך response.data.data
        if (response && response.data && Array.isArray(response.data.data)) {
          this.allLessons = response.data.data;
        }
        // אם המבנה הוא response.data (והוא מערך)
        else if (response && Array.isArray(response.data)) {
          this.allLessons = response.data;
        }
        else {
          this.allLessons = [];
        }

        this.filteredLessons = [...this.allLessons];
        console.log('Lessons assigned to table:', this.allLessons.length);
      },
      error: (err) => {
        console.error('Error:', err);
        this.allLessons = [];
        this.filteredLessons = [];
      }
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