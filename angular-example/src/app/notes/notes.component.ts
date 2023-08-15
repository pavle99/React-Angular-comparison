import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INote } from 'src/types/note';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  private baseUrl: string = 'http://localhost:3000/notes';

  notes: INote[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.notes = this.route.snapshot.data['notes'];
  }

  toggleCompleteNote = (id: number) => {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      const updatedNote = { ...note, completed: !note.completed };
      this.http
        .put<INote>(`${this.baseUrl}/${id}`, updatedNote)
        .subscribe((newNote) => {
          this.notes = this.notes.map((n) => (n.id === id ? newNote : n));
        });
    }
  };

  deleteNote = (id: number) => {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe((response) => {
      this.notes = this.notes.filter((note) => note.id !== id);
    });
  };

  addNoteForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  addNote = () => {
    const note = {
      title: this.addNoteForm.value.title || 'Prazan naslov',
      description: this.addNoteForm.value.description || 'Prazan opis',
      completed: false,
    };
    this.http.post<INote>(this.baseUrl, note).subscribe((newNote) => {
      this.notes = [...this.notes, newNote];
      this.addNoteForm.reset();
    });
  };

  user$ = this.loginService.user$;

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
