import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project';
import { Task, TaskPriority, TaskService, TaskStatus } from '../../core/services/task';
@Component({selector:'app-tasks',imports:[CommonModule,ReactiveFormsModule,RouterLink],templateUrl:'./tasks.html',styleUrl:'./tasks.css'})
export class Tasks implements OnInit{
 private readonly route=inject(ActivatedRoute); private readonly fb=inject(FormBuilder); readonly taskService=inject(TaskService); readonly projectService=inject(ProjectService);
 readonly tasks=this.taskService.tasks; readonly projects=this.projectService.projects; readonly isLoading=this.taskService.isLoading; readonly error=this.taskService.error;
 readonly searchTerm=signal(''); readonly selectedStatus=signal<TaskStatus|'all'>('all'); readonly selectedPriority=signal<TaskPriority|'all'>('all'); readonly sortBy=signal<'dueDate'|'priority'|'status'|'title'>('dueDate'); readonly editingTask=signal<Task|null>(null);
 readonly taskForm=this.fb.nonNullable.group({title:['',Validators.required],description:[''],status:['todo' as TaskStatus,Validators.required],priority:['medium' as TaskPriority,Validators.required],dueDate:['',Validators.required],projectId:['']});
 readonly filteredTasks=computed(()=>{const s=this.searchTerm().trim().toLowerCase(),st=this.selectedStatus(),pr=this.selectedPriority(),sort=this.sortBy();const filtered=this.tasks().filter(t=>(!s||t.title.toLowerCase().includes(s)||t.description?.toLowerCase().includes(s))&&(st==='all'||t.status===st)&&(pr==='all'||t.priority===pr));return [...filtered].sort((a,b)=>{switch(sort){case'dueDate':return a.dueDate.getTime()-b.dueDate.getTime();case'priority':{const o:Record<TaskPriority,number>={high:1,medium:2,low:3};return o[a.priority]-o[b.priority]}case'status':return a.status.localeCompare(b.status);case'title':return a.title.localeCompare(b.title)}});});
 ngOnInit():void{this.route.queryParamMap.subscribe(p=>{const id=Number(p.get('edit'));if(!id)return;const task=this.tasks().find(t=>t.id===id);if(task)this.editTask(task);});}
 submitTask():void{if(this.taskForm.invalid){this.taskForm.markAllAsTouched();return;}const v=this.taskForm.getRawValue();const data={title:v.title,description:v.description,status:v.status,priority:v.priority,dueDate:new Date(v.dueDate),projectId:v.projectId?Number(v.projectId):undefined};const current=this.editingTask();if(current)this.taskService.updateTask({...current,...data});else this.taskService.addTask(data);this.cancelEdit();}
 editTask(task:Task):void{this.editingTask.set(task);this.taskForm.patchValue({title:task.title,description:task.description,status:task.status,priority:task.priority,dueDate:task.dueDate.toISOString().split('T')[0],projectId:task.projectId?.toString()??''});window.scrollTo({top:0,behavior:'smooth'});}
 deleteTask(id:number):void{const t=this.tasks().find(x=>x.id===id);if(!t||!window.confirm(`Are you sure you want to delete "${t.title}"?`))return;this.taskService.deleteTask(id);}
 updateStatus(task:Task,status:TaskStatus):void{this.taskService.updateTask({...task,status});}
 cancelEdit():void{this.editingTask.set(null);this.taskForm.reset({title:'',description:'',status:'todo',priority:'medium',dueDate:'',projectId:''});}
 clearFilters():void{this.searchTerm.set('');this.selectedStatus.set('all');this.selectedPriority.set('all');this.sortBy.set('dueDate');}
}
