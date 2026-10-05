import { Injectable, signal } from '@angular/core';
export type TaskStatus = 'todo'|'in-progress'|'completed';
export type TaskPriority = 'low'|'medium'|'high';
export interface Task { id:number; title:string; description:string; status:TaskStatus; priority:TaskPriority; dueDate:Date; projectId?:number; }
@Injectable({providedIn:'root'})
export class TaskService {
  readonly tasks = signal<Task[]>([
    {id:1,title:'Design dashboard',description:'Create the initial dashboard layout and statistics.',status:'in-progress',priority:'high',dueDate:new Date('2026-09-20'),projectId:1},
    {id:2,title:'Implement task filters',description:'Add search, status, priority and sorting.',status:'completed',priority:'medium',dueDate:new Date('2026-09-15'),projectId:1},
    {id:3,title:'Prepare API layer',description:'Plan the HTTP service integration.',status:'todo',priority:'low',dueDate:new Date('2026-09-28'),projectId:2}
  ]);
  readonly isLoading=signal(false); readonly error=signal<string|null>(null);
  addTask(task:Omit<Task,'id'>):void{const id=Math.max(0,...this.tasks().map(t=>t.id))+1;this.tasks.update(ts=>[...ts,{...task,id}]);}
  updateTask(task:Task):void{this.tasks.update(ts=>ts.map(t=>t.id===task.id?task:t));}
  deleteTask(id:number):void{this.tasks.update(ts=>ts.filter(t=>t.id!==id));}
}
