import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { INote } from 'src/types/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder) {}

  title = 'angular-example';

  notes: INote[] = [
    {
      id: 1,
      title: 'Sastanak sa timom',
      description:
        'Pripremiti pitanja za sastanak sa timom u vezi novog projekta.',
      completed: false,
    },
    {
      id: 2,
      title: 'Kupovina namirnica',
      description: 'Kupiti sveze voce, povrce i mlecne proizvode u prodavnici.',
      completed: false,
    },
  ];

  toggleCompleteNote = (id: number) => {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          completed: !note.completed,
        };
      }
      return note;
    });
  };

  deleteNote = (id: number) => {
    this.notes = this.notes.filter((note) => note.id !== id);
  };

  addNoteForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  addNote = () => {
    const note: INote = {
      id: this.notes.length + 1,
      title: this.addNoteForm.value.title || 'Prazan naslov',
      description: this.addNoteForm.value.description || 'Prazan opis',
      completed: false,
    };
    this.notes = [...this.notes, note];
    this.addNoteForm.reset();
  };
}
