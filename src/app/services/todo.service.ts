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
private baseUrl = 'https://localhost:44377/api/Todos';
  constructor(private http: HttpClient) {
    // Initialize with some sample data
  }

  getTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post(`${this.baseUrl}`, todo);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: string): Observable<any>    {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
}
