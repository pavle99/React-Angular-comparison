import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { AuthGuard } from './auth.guard';
import { NotesResolver } from './notes.resolver';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard],
    resolve: { notes: NotesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
