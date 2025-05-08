import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Todo, TodoPriority, TodoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PriortyPipe } from 'src/app/pipes/priorty.pipe';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TruncatePipe,
     MatTooltipModule, MatSnackBarModule, PriortyPipe,StatusPipe],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() getTodos = new EventEmitter<any>();
    TodoPriority = TodoPriority;
  TodoStatus = TodoStatus;
  constructor(private todoService: TodoService, private snackBar: MatSnackBar, private router: Router) { }


  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((response) => {
      if (response) {
        this.getTodos.emit()
        this.snackBar.open('Todo updated successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe((response) => {
      console.log(response)
      // if (response) {
        this.getTodos.emit()
        this.snackBar.open('Todo deleted successfully', 'Close', {
          duration: 3000,
        });
      // }
    });
  }
  routeToEdit(todo: Todo): void {
    console.log(todo)
    this.router.navigate(['/edit', todo.id]);
  }

}
