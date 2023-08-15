import { useEffect, useState } from "react";
import Note from "../components/Note";
import { useUser } from "../siteContext";
import { useNavigate } from "react-router-dom";
import { INote } from "../types/note";

function Notes() {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((res) => res.json())
      .then((res) => setNotes(res));
  }, []);

  const [notes, setNotes] = useState<INote[]>([]);

  function toggleCompleteNote(id: number) {
    const note = notes.find((n) => n.id === id);

    if (note) {
      const updatedNote = { ...note, completed: !note.completed };
      fetch(`http://localhost:3000/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      })
        .then((res) => res.json())
        .then((newNote) => setNotes(notes.map((note) => (note.id === id ? newNote : note))));
    }
  }

  function deleteNote(id: number) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });
  }

  function addNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const newNote = {
      title: (data.get("title") || "Prazan naslov") as string,
      description: (data.get("description") || "Prazan opis") as string,
      completed: false,
    };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((newNote) => setNotes([...notes, newNote]));

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
