import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapTodoListComponent } from './components/bootstrap-todo-list/bootstrap-todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

const routes: Routes = [
  { path: '', component: BootstrapTodoListComponent },
  { path: 'add', component: TodoFormComponent },
  { path: 'edit/:id', component: TodoFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
