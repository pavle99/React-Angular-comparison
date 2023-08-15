import { useEffect, useState } from "react";
import Note from "../components/Note";
import { useUser } from "../siteContext";
import { useNavigate } from "react-router-dom";

function Notes() {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

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

  function addNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const newNote = {
      id: notes.length + 1,
      title: (data.get("title") || "Prazan naslov") as string,
      description: (data.get("description") || "Prazan opis") as string,
      completed: false,
    };

    setNotes([...notes, newNote]);

    e.currentTarget.reset();
  }

  return (
    <div>
      <div>
        <h2>Dobrodosao {user}!</h2>
        <button onClick={() => setUser("")}>Odjavi se</button>
      </div>
      <form onSubmit={addNote}>
        <input name="title" type="text" placeholder="Title" />
        <input name="description" type="text" placeholder="Description" />
        <button type="submit">Add note</button>
      </form>
      <h1>Lista beleski</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} toggleCompleteNote={toggleCompleteNote} deleteNote={deleteNote} />
        ))}
      </ul>
    </div>
  );
}

export default Notes;
