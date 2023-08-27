import { INote } from "../types/note";

import "../styles/notes.css";
interface INoteProps {
  note: INote;
  toggleCompleteNote: (id: number) => void;
  deleteNote: (id: number) => void;
}

const Note = ({ note, toggleCompleteNote, deleteNote }: INoteProps) => {
  return (
    <li className="note-item">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-description">{note.description}</p>
      <p className="note-status">Status: {note.completed ? "Zavrseno" : "Nije zavrseno"}</p>
      <button onClick={() => toggleCompleteNote(note.id)} className="toggle-status-button">
        Oznaci kao {note.completed ? "Nije zavrseno" : "Zavrseno"}
      </button>
      <button onClick={() => deleteNote(note.id)} className="delete-note-button">
        Izbrisi
      </button>
    </li>
  );
};

export default Note;
