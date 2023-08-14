import { useState } from "react";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Sastanak sa timom",
      description: "Pripremiti pitanja za sastanak sa timom u vezi novog projekta.",
      completed: false,
    },
    {
      id: 2,
      title: "Kupovina namirnica",
      description: "Kupiti sveze voce, povrce i mlecne proizvode u prodavnici.",
      completed: false,
    },
  ]);

  function toggleCompleteNote(id: number) {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          completed: !note.completed,
        };
      }
      return note;
    });
    setNotes(newNotes);
  }

  function deleteNote(id: number) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div>
      <h1>Lista beleski</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} toggleCompleteNote={toggleCompleteNote} deleteNote={deleteNote} />
        ))}
      </ul>
    </div>
  );
}

export default App;
