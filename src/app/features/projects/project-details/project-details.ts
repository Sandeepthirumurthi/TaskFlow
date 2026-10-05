import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project';
import { TaskService } from '../../../core/services/task';
@Component({selector:'app-project-details',imports:[RouterLink],templateUrl:'./project-details.html',styleUrl:'./project-details.css'})
export class ProjectDetails{
 private readonly route=inject(ActivatedRoute);private readonly projectService=inject(ProjectService);private readonly taskService=inject(TaskService);private readonly projectId=Number(this.route.snapshot.paramMap.get('id'));
 readonly project=computed(()=>this.projectService.projects().find(p=>p.id===this.projectId));readonly tasks=computed(()=>this.taskService.tasks().filter(t=>t.projectId===this.projectId));readonly progress=computed(()=>{const ts=this.tasks();return ts.length?Math.round(ts.filter(t=>t.status==='completed').length/ts.length*100):0;});
}
