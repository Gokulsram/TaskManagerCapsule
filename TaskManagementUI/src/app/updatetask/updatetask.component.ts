import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IParentTask } from '../Interface/IParentTask';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit, PipeTransform {

  parentTask: IParentTask[];
  form: FormGroup;

  options: Options = {
    floor: 0,
    ceil: 30
  };

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'MM/dd/yyyy');
    return value;
  }

  taskid: number;
  constructor(private router: Router, route: ActivatedRoute, private _taskService: TaskService, private formBuilder: FormBuilder) {
    this.taskid = route.snapshot.params['taskid'];
    this.GetParentTask();
  }

  private GetParentTask() {

    this._taskService.getParentTask().subscribe(
      result => {
        this.parentTask = result;
        this.GetTaskById();
      });

  }

  GetTaskById() {
    this._taskService.getTaskById(this.taskid).subscribe(
      result => {
        this.form = this.formBuilder.group({
          Task_ID: [this.taskid],
          Task1: [result.Task1, Validators.required],
          Priority: [result.Priority],
          Parent_ID: [result.Parent_ID],
          Start_Date: [this.transform(result.Start_Date.toString()), Validators.required],
          End_Date: [result.End_Date != null ? this.transform(result.End_Date.toString()) : '']
        });
      });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Task_ID: [this.taskid],
      Task1: [null, Validators.required],
      Priority: [null],
      Parent_ID: [null],
      Start_Date: [null, Validators.required],
      End_Date: [null],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this._taskService.UpdateTask(this.form.value).subscribe(
        result => {
          this.router.navigate(['/']);
        }
      );

    } else {
      console.log('Please corret erros');
    }

  }

}
