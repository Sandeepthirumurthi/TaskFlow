import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects').then(m => m.Projects) },
  { path: 'projects/:id', loadComponent: () => import('./features/projects/project-details/project-details').then(m => m.ProjectDetails) },
  { path: 'tasks', loadComponent: () => import('./features/tasks/tasks').then(m => m.Tasks) },
  { path: 'tasks/:id', loadComponent: () => import('./features/tasks/task-details/task-details').then(m => m.TaskDetails) },
  { path: '**', redirectTo: 'dashboard' }
];
