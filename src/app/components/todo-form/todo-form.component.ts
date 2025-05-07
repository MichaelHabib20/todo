import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo, TodoStatus, TodoPriority } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  TodoPriority = TodoPriority;
  isEditMode = false;
  todoId: string | null = null;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      priority: [TodoPriority.Medium],
      dueDate: ['', [this.dateNotInPastValidator()]]
    });
  }

  dateNotInPastValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return selectedDate < today ? { dateInPast: true } : null;
    };
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.todoId;

    if (this.isEditMode && this.todoId) {
      const todo = this.todoService.getTodoById(this.todoId);
      if (todo) {
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : ''
        });
      } else {
        // If todo not found, redirect to home
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todo: Todo = {
        id: this.isEditMode ? this.todoId! : crypto.randomUUID(),
        title: formValue.title,
        description: formValue.description,
        status: 1,
        priority: formValue.priority,
        dueDate: formValue.dueDate ,
        createdDate: this.isEditMode ? new Date() : new Date(),
        lastModifiedDate: new Date()
      };
      
      if (this.isEditMode) {
        this.todoService.updateTodo(todo);
      } else {
        this.todoService.addTodo(todo);
      }
      
      this.router.navigate(['/']);
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
