import { Component, Input } from '@angular/core';
import { INote } from 'src/types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  @Input() note!: INote;

  @Input() toggleCompleteNote!: (id: number) => void;

  @Input() deleteNote!: (id: number) => void;
}
