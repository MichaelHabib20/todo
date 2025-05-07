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
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.originalTodos = [...todos];
    });
  }

  addTodo(): void {
    if (this.newTodo.title) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: this.newTodo.title,
        description: this.newTodo.description,
        status: 1,
        priority: 2,
        dueDate: this.newTodo.dueDate,
        createdDate: new Date(),
        lastModifiedDate: new Date()
      };
      
      this.todoService.addTodo(todo);
      this.newTodo = {
        title: '',
        description: '',
        priority: 2,
        status: 1
      };
    }
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
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
} 