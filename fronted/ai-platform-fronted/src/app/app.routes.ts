import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { History } from './features/dashboard/history/history';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'history', component: History },
    { path: 'admin', component: AdminDashboard },
    { path: '', redirectTo: '/register', pathMatch: 'full' }

];
