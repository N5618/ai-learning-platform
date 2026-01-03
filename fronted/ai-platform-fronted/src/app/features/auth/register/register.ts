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
    next: (response: any) => {
      console.log("תשובת השרת המלאה:", response);

    
      const user = response.data?.user;
      const token = response.data?.token;

      if (user && token) {
       
        localStorage.setItem('token', token);
        
        localStorage.setItem('currentUser', JSON.stringify(user));
   
        localStorage.setItem('user_id', user._id);
        
        console.log("התחברות הצליחה, טוקן ומשתמש נשמרו");

     
        if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        console.warn("חסר מידע קריטי (User או Token) בתגובת השרת");
        this.errorMessage = "שגיאה בקבלת נתוני גישה מהשרת";
      }
    },
    error: (err) => {
      if (err.status === 0) {
        this.errorMessage = "השרת לא זמין. וודאי שהפעלת את ה-Backend";
      } else {
        this.errorMessage = err.error?.message || "קרתה שגיאה ברישום";
      }
    }
  });}}
