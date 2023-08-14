import { INote } from "../types/note";

interface INoteProps {
  note: INote;
  toggleCompleteNote: (id: number) => void;
  deleteNote: (id: number) => void;
}

const Note = ({ note, toggleCompleteNote, deleteNote }: INoteProps) => {
  return (
    <li>
      <h2>{note.title}</h2>
      <p>{note.description}</p>
      <p>Status: {note.completed ? "Zavrseno" : "Nije zavrseno"}</p>
      <button onClick={() => toggleCompleteNote(note.id)}>
        Oznaci kao {note.completed ? "Nije zavrseno" : "Zavrseno"}
      </button>
      <button onClick={() => deleteNote(note.id)}>Izbrisi</button>
    </li>
  );
};

export default Note;
