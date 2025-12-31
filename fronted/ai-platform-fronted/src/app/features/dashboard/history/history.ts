import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prompt } from '../../../core/models/learning.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  @Input() allLessons: Prompt[] = [];

  @Output() lessonSelected = new EventEmitter<Prompt>();

  onSelectedLesson(lesson: Prompt) {
    console.log('Lesson selected:', lesson);
    this.lessonSelected.emit(lesson);
  }
}
