import { Injectable, signal } from '@angular/core';
export type ProjectStatus='active'|'completed'|'on-hold';
export interface Project{id:number;name:string;description:string;status:ProjectStatus;}
@Injectable({providedIn:'root'})
export class ProjectService{
 readonly projects=signal<Project[]>([
  {id:1,name:'TaskFlow Application',description:'Angular task and project management application.',status:'active'},
  {id:2,name:'API Integration',description:'Future backend and HTTP integration work.',status:'active'}
 ]);
 addProject(project:Omit<Project,'id'>):void{const id=Math.max(0,...this.projects().map(p=>p.id))+1;this.projects.update(ps=>[...ps,{...project,id}]);}
 updateProject(project:Project):void{this.projects.update(ps=>ps.map(p=>p.id===project.id?project:p));}
 deleteProject(id:number):void{this.projects.update(ps=>ps.filter(p=>p.id!==id));}
}
