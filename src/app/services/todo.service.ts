import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, TodoStatus, TodoPriority } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
private baseUrl = 'http://localhost:3000/api/Todos';
  constructor(private http: HttpClient) {
    // Initialize with some sample data
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
    this.addTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item This is a sample todo item' ,
      status: 1,
      priority:2,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.todosSubject.next([...this.todos]);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: string): Observable<any>    {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }
} 