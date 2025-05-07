import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapTodoListComponent } from './components/bootstrap-todo-list/bootstrap-todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoService } from './services/todo.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BootstrapTodoListComponent,
    TodoFormComponent,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
