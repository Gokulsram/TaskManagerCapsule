import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskmanagementComponent } from './taskmanagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../task.service';
import { AppRoutingModule } from '../app-routing.module';
import { AddtaskComponent } from '../addtask/addtask.component';
import { UpdatetaskComponent } from '../updatetask/updatetask.component';

describe('TaskmanagementComponent', () => {
  let component: TaskmanagementComponent;
  let fixture: ComponentFixture<TaskmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskmanagementComponent,AddtaskComponent,UpdatetaskComponent],
      imports: [FormsModule, Ng5SliderModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(), HttpClientModule, AppRoutingModule],
      providers: [TaskService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
