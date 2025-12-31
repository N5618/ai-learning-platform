import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Prompt, SubCategory } from '../../../core/models/learning.model'; // ודאי שהנתיב נכון
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-learning-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learning-form.html',
  styleUrl: './learning-form.css'
})
export class LearningForm {

  @Output() lessonGenerated = new EventEmitter<Prompt>();

  categories: Category[] = [];
  subCategories: SubCategory[] = [];


  selectedCategoryId: string = '';
  selectedSubCategoryId: string = '';
  userPrompt: string = '';



  isLoading: boolean = false;

  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }
  onCategoryChange() {
    this.apiService.getSubCategoriesByCategory(this.selectedCategoryId).subscribe(res => {
      this.subCategories = res;
    })
  }

  onSubmit() {
    if (!this.selectedSubCategoryId || !this.userPrompt) return;

    this.isLoading = true;

    const currentUserId = localStorage.getItem('user_id');

    if (!currentUserId) {
      console.error('No User ID found');
      this.isLoading = false;
      return;
    }

    const payload = {
      userId: currentUserId,
      categoryId: this.selectedCategoryId,
      subCategoryId: this.selectedSubCategoryId,
      userQuestion: this.userPrompt,
    };

    this.apiService.sendPrompt(payload).subscribe({
      next: (lesson) => {
        this.lessonGenerated.emit(lesson);
        this.isLoading = false;
        this.userPrompt = '';
      },
      error: (err) => {
        console.error('AI Error:', err);
        this.isLoading = false;
      }
    });
  }
}

