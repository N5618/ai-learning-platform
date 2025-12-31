import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { History } from './features/dashboard/history/history';

export const routes: Routes = [
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'history', component: History },
    { path: '', redirectTo: '/register', pathMatch: 'full' }

];
