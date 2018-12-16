import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { IParentTask } from '../Interface/IParentTask';
import { TaskService } from '../task.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  form: FormGroup;
  parentTask: IParentTask[];

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 30
  };


  constructor(private _taskService: TaskService, private formBuilder: FormBuilder) {
    this.GetParentTask();
  }

  private GetParentTask() {

    this._taskService.getParentTask().subscribe(
      result => {
        this.parentTask = result;
      });

  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      Task1: [null, Validators.required],
      Priority: [null],
      Parent_ID: [null],
      Start_Date: [null, Validators.required],
      End_Date: [null],

    });
  }

  Clear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {   
      this._taskService.SaveTask(this.form.value).subscribe();
      this.form.reset();
    } else {
      console.log('Please corret erros');
    }

  }

}
