import { Component } from '@angular/core';
import { LessonView } from './lesson-view/lesson-view';
import { CommonModule } from '@angular/common';
import { LearningForm } from './learning-form/learning-form';
import { ApiResponse, Prompt } from '../../core/models/learning.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,LearningForm,LessonView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  currentLesson: Prompt | null = null;

  onLessonGenerated(lesson:Prompt){
    this.currentLesson = lesson;
  }
  

}
