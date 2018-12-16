import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskmanagementComponent } from './taskmanagement/taskmanagement.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [

  { path: '', component: TaskmanagementComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'edittask/:taskid', component: UpdatetaskComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
