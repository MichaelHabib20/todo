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
      this.todoService.getTodoById(this.todoId).subscribe({
        next: (response) => {
          this.setFormsValue(response)

        },
        error: (err) => {
          console.error('حدث خطأ أثناء إضافة المهمة', err);
        },
      })

      }

  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      let todo: Todo = {
        title: formValue.title,
        description: formValue.description,
        status: 1,
        priority: Number(formValue.priority),
        dueDate: formValue.dueDate ,
      };

      if (this.isEditMode) {
        todo.id = this.todoId!
        this.todoService.updateTodo(todo).subscribe({
          next: (response) => {
            console.log('Updated Succssfully', response);
            this.router.navigate(['/'])

          },
          error: (err) => {
            console.error('حدث خطأ أثناء إضافة المهمة', err);
          },
        })
      } else {
        console.log(todo)
        this.todoService.addTodo(todo).subscribe({
          next: (response) => {
            console.log('Inserted Succssfully', response);
            this.router.navigate(['/'])

          },
          error: (err) => {
            console.error('حدث خطأ أثناء إضافة المهمة', err);
          },
        });

      }

      this.router.navigate(['/']);
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
  setFormsValue(response : any){
    this.todoForm.patchValue(response)
  }
}
