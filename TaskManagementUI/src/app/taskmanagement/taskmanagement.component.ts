import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ITask } from '../Interface/ITask';
import { IParentTask } from '../Interface/IParentTask';
import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';

@Component({
  selector: 'app-taskmanagement',
  templateUrl: './taskmanagement.component.html',
  styleUrls: ['./taskmanagement.component.css']
})
export class TaskmanagementComponent implements OnInit, PipeTransform {

  startdate: Date;
  enddate: Date;
  allTask: ITask[];
  searchTask: ITask[];
  OrginalTask: ITask[];
  parentTask: IParentTask[];
  searchTaskname: string = '';
  searchParentTask: number;
  searchPriorityFrom: number;
  searchPriorityTo: number;
  isSearch: boolean;

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }

  constructor(private _taskService: TaskService) {
    this.startdate = null;
    this.enddate = null;
    this.GetAllTask();
    this.GetParentTask();
  }

  private GetAllTask() {

    this._taskService.getAllTask().subscribe(
      result => {
        this.allTask = result;
        this.searchTask = result;
        this.OrginalTask = result;
      });

  }

  private GetParentTask() {

    this._taskService.getParentTask().subscribe(
      result => {
        this.parentTask = result;
      });

  }

  ngOnInit() {
    this.isSearch = false;
  }

  EndTask(taskid) {
    console.log(taskid);
    this._taskService.endTask(taskid).subscribe();
    this.GetAllTask();
  }

  search() {

    this.isSearch = false;
    this.searchTask = this.OrginalTask;

    if (this.searchTaskname.trim() != '') {
      this.searchTask = this.searchTask.filter(task => task.Task1 === this.searchTaskname);
      this.isSearch = true;
    }

    if (this.searchParentTask > 0) {
      this.searchTask = this.searchTask.filter(task => task.Parent_ID == this.searchParentTask);
      this.isSearch = true;
    }

    if (this.searchPriorityFrom > 0 && this.searchPriorityTo > 0) {
      this.searchTask = this.searchTask.filter(task => task.Priority > this.searchPriorityFrom && task.Priority < this.searchPriorityTo);
      this.isSearch = true;
    }

    if (this.startdate != null) {
      this.searchTask = this.searchTask.filter(task => task.Start_Date === this.transform(this.startdate.toString()));
      this.isSearch = true;
    }

    if (this.enddate != null) {
      this.searchTask = this.searchTask.filter(task => task.End_Date === this.transform(this.enddate.toString()));
      this.isSearch = true;
    }

    if (this.isSearch) {
      this.allTask = this.searchTask;
    }
    else
      this.allTask = this.OrginalTask;

  }

}
