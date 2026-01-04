import { Component } from '@angular/core';
import { LessonView } from './lesson-view/lesson-view';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LearningForm } from './learning-form/learning-form';
import { Prompt } from '../../core/models/learning.model';
import { ApiService } from '../../core/services/api';
import { History } from './history/history';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LearningForm, LessonView, History],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  currentLesson: Prompt | null = null;
  allLessons: Prompt[] = [];

  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.loadHistory();
  }

  onLessonGenerated(lesson: Prompt) {
    this.currentLesson = lesson;

    this.allLessons = [lesson, ...this.allLessons];

    console.log('Current lesson set to:', this.currentLesson);
  }
  onLessonSelected(lesson: Prompt) {
    this.currentLesson = lesson;
  }
  loadHistory() {
    const currentUserId = localStorage.getItem('user_id');

    if (!currentUserId) return;

    this.allLessons = [];
    console.log('Array cleared, fetching new data for:', currentUserId);

    this.apiService.getHistoryById(currentUserId).subscribe({
      next: (response: any) => {
        console.log('Server response received:', response);

        this.allLessons = response.data || response;

        console.log('allLessons updated, length:', this.allLessons.length);

        if (this.allLessons.length > 0) {
          this.currentLesson = this.allLessons[0];
        }
      },
      error: (err) => console.error('Error loading history', err)
    });
  }
}


