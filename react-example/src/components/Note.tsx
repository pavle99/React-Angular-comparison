import { INote } from "../types/note";

const Note = ({ note }: { note: INote }) => {
  return (
    <li>
      <h2>{note.title}</h2>
      <p>{note.description}</p>
      <p>Status: {note.completed ? "Zavrseno" : "Nije zavrseno"}</p>
      <button>Oznaci kao {note.completed ? "Nije zavrseno" : "Zavrseno"}</button>
      <button>Izbrisi</button>
    </li>
  );
};

export default Note;
