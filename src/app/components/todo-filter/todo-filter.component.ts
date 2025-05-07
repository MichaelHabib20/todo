import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoPriority, TodoStatus } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatFormFieldModule,
     MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent {
  @Output() filterChange = new EventEmitter<any>();
  
  filterForm: FormGroup;
  priorities = [
    { value: 0, label: 'Low' },
    { value: 1, label: 'Medium' },
    { value: 2, label: 'High' }
  ];
  
  statuses = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Completed' }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      priority: [''],
      status: [''],
      dueDate: ['']
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.filterChange.emit(value);
    });
  }
} 