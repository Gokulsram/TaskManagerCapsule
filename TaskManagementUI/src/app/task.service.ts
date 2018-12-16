import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './Interface/ITask';
import { IParentTask } from './Interface/IParentTask';


@Injectable()
export class TaskService {
  
  //baseUrl: string = 'http://172.20.199.27/TaskManagerApi/task/';
  //baseUrl: string = 'http://172.18.4.6/TaskManagerApi/task/';
  baseUrl: string = 'http://localhost:54792//task/';


  constructor(private http: HttpClient) { }

  getAllTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl + 'gettasks')
      .pipe();
  }

  getParentTask(): Observable<IParentTask[]> {
    return this.http.get<IParentTask[]>(this.baseUrl + 'getparenttask')
      .pipe();
  }

  endTask(taskid: number) {
    return this.http.post(this.baseUrl + 'endtask?taskid=' + taskid, '');
  }

  SaveTask(task: any) {
    return this.http.post(this.baseUrl + 'inserttask', task);
  }

  getTaskById(taskid: number): Observable<ITask> {
    return this.http.get<ITask>(this.baseUrl + 'GetTask?taskid=' + taskid)
      .pipe();
  }


  UpdateTask(task: any) {
    return this.http.put(this.baseUrl + 'updateTask', task);
  }

}
