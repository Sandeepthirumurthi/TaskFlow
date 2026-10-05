import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Project, ProjectService, ProjectStatus } from '../../core/services/project';
import { TaskService } from '../../core/services/task';
@Component({selector:'app-projects',imports:[ReactiveFormsModule,RouterLink],templateUrl:'./projects.html',styleUrl:'./projects.css'})
export class Projects{
 private readonly fb=inject(FormBuilder);private readonly projectService=inject(ProjectService);private readonly taskService=inject(TaskService);readonly projects=this.projectService.projects;readonly tasks=this.taskService.tasks;readonly editingProject=signal<Project|null>(null);
 readonly projectForm=this.fb.nonNullable.group({name:['',Validators.required],description:[''],status:['active' as ProjectStatus,Validators.required]});
 projectTasks(id:number){return this.tasks().filter(t=>t.projectId===id)} projectProgress(id:number):number{const ts=this.projectTasks(id);return ts.length?Math.round(ts.filter(t=>t.status==='completed').length/ts.length*100):0;}
 submitProject():void{if(this.projectForm.invalid){this.projectForm.markAllAsTouched();return}const v=this.projectForm.getRawValue(),c=this.editingProject();if(c)this.projectService.updateProject({...c,...v});else this.projectService.addProject(v);this.cancelEdit();}
 editProject(p:Project):void{this.editingProject.set(p);this.projectForm.patchValue(p);window.scrollTo({top:0,behavior:'smooth'});}
 deleteProject(id:number):void{const p=this.projects().find(x=>x.id===id);if(!p||!window.confirm(`Are you sure you want to delete "${p.name}" and all its tasks?`))return;this.tasks().filter(t=>t.projectId===id).forEach(t=>this.taskService.deleteTask(t.id));this.projectService.deleteProject(id);}
 cancelEdit():void{this.editingProject.set(null);this.projectForm.reset({name:'',description:'',status:'active'});}
}
