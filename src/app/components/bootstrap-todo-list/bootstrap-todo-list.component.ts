import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TodoStatus, TodoPriority } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatIconModule } from '@angular/material/icon';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router } from '@angular/router';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
@Component({
  selector: 'app-bootstrap-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TodoItemComponent, TodoFilterComponent],
  templateUrl: './bootstrap-todo-list.component.html',
  styleUrls: ['./bootstrap-todo-list.component.css']
})
export class BootstrapTodoListComponent implements OnInit {
  todos: Todo[] = [];
  originalTodos: Todo[] = [];
  TodoStatus = TodoStatus;
  TodoPriority = TodoPriority;
  newTodo: Partial<Todo> = {
    title: '',
    description: '',
    priority: 2,
    status: 1
  };

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    console.log('s')
    this.getTodos()
  }



  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('Updated Succssfully', response);

      },
      error: (err) => {
        console.error('حدث خطأ أثناء إضافة المهمة', err);
      },
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: (response) => {
        console.log('Deleted Succssfully', response);

      },
      error: (err) => {
        console.error('حدث خطأ أثناء إضافة المهمة', err);
      },

    })
  }
  openAddTodo(): void {
    this.router.navigate(['/add']);
  }
  onFilterChange(filter: any): void {
    this.todos = this.originalTodos.filter(todo => {
      let matchesFilter = true;

      // Filter by priority if selected
      if (filter.priority !== undefined && filter.priority !== '') {
        matchesFilter = matchesFilter && todo.priority === Number(filter.priority);
      }

      // Filter by status if selected
      if (filter.status !== undefined && filter.status !== '') {
        matchesFilter = matchesFilter && todo.status === Number(filter.status);
      }

      // Filter by due date if selected
      if (filter.dueDate && todo.dueDate) {
        const todoDueDate = new Date(todo.dueDate).toDateString();
        const filterDueDate = new Date(filter.dueDate).toDateString();
        matchesFilter = matchesFilter && todoDueDate === filterDueDate;
      }

      return matchesFilter;
    });
  }
  getTodos(){
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response;
        this.originalTodos = [...response];      },
      error: (err) => {
        console.error('حدث خطأ أثناء إضافة المهمة', err);
      },
    })
  }
}
