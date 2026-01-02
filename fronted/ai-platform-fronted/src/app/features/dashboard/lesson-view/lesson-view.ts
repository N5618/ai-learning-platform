import { Component, Input } from '@angular/core';
import { Prompt } from '../../../core/models/learning.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-view.html',
  styleUrl: './lesson-view.css',
})
export class LessonView {
  @Input() promptData: Prompt | null = null;
  @Input() content: Prompt | null = null;
  printLesson() {
    window.print();
  }
}
