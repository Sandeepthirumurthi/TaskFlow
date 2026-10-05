import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project';
import { TaskService } from '../../core/services/task';
@Component({selector:'app-dashboard',imports:[RouterLink],templateUrl:'./dashboard.html',styleUrl:'./dashboard.css'})
export class Dashboard{
 private readonly taskService=inject(TaskService);private readonly projectService=inject(ProjectService);readonly tasks=this.taskService.tasks;readonly projects=this.projectService.projects;
 readonly totalTasks=computed(()=>this.tasks().length);readonly completedTasks=computed(()=>this.tasks().filter(t=>t.status==='completed').length);readonly todoTasks=computed(()=>this.tasks().filter(t=>t.status==='todo').length);readonly inProgressTasks=computed(()=>this.tasks().filter(t=>t.status==='in-progress').length);readonly completionPercentage=computed(()=>this.totalTasks()?Math.round(this.completedTasks()/this.totalTasks()*100):0);readonly overdueTasks=computed(()=>this.tasks().filter(t=>t.status!=='completed'&&t.dueDate<new Date()).length);
}
