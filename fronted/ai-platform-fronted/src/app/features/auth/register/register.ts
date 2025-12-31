import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponse, User } from '../../../core/models/learning.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  errorMessage: string | null = null;
  userData: User = {
    name: '',
    phone: ''
  };


  onRegister() {
  this.errorMessage = null;

  this.apiService.register(this.userData).subscribe({
   
    next: (response: ApiResponse<User>) => { 
      console.log("תשובת השרת:", response);

      const userData = response.data;
  
      if (userData && userData._id) {
        localStorage.setItem('user_id', userData._id);
      }

     
      if (response.message === "WELCOME_BACK") {
        alert('טוב שחזרת! עובר לדשבורד...');
      } else {
        alert('נרשמת בהצלחה!');
      }

      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      if (err.status === 0) {
        this.errorMessage = "השרת לא זמין. וודאי שהפעלת את ה-Backend";
      } else {
        this.errorMessage = err.error?.message || "קרתה שגיאה ברישום";
      }
    }
  });
}
}