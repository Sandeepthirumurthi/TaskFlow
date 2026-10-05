import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project';
import { TaskService } from '../../../core/services/task';
@Component({selector:'app-task-details',imports:[RouterLink,DatePipe],templateUrl:'./task-details.html',styleUrl:'./task-details.css'})
export class TaskDetails{
 private readonly route=inject(ActivatedRoute);private readonly router=inject(Router);private readonly taskService=inject(TaskService);private readonly projectService=inject(ProjectService);private readonly taskId=Number(this.route.snapshot.paramMap.get('id'));
 readonly task=computed(()=>this.taskService.tasks().find(t=>t.id===this.taskId));readonly project=computed(()=>{const t=this.task();return t?.projectId?this.projectService.projects().find(p=>p.id===t.projectId):undefined;});
 editTask():void{const t=this.task();if(t)this.router.navigate(['/tasks'],{queryParams:{edit:t.id}});}
 deleteTask():void{const t=this.task();if(!t||!window.confirm(`Are you sure you want to delete "${t.title}"?`))return;this.taskService.deleteTask(t.id);this.router.navigate(['/tasks']);}
}
