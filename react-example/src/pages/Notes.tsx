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
        .then((newNote) => setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? newNote : note))));
    }
  }

  function deleteNote(id: number) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

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

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <div className="notes-container">
      <div className="header">
        <h2 className="welcome-message">Dobrodosao {user}!</h2>
        <button onClick={logout} className="logout-button">
          Odjavi se
        </button>
      </div>
      <form onSubmit={addNote} className="add-note-form">
        <input name="title" type="text" placeholder="Title" className="note-input" />
        <input name="description" type="text" placeholder="Description" className="note-input" />
        <button type="submit" className="add-note-button">
          Dodaj belesku
        </button>
      </form>
      <h1 className="notes-list-title">Lista beleski</h1>
      <ul className="notes-list">
        {notes.map((note) => (
          <Note key={note.id} note={note} toggleCompleteNote={toggleCompleteNote} deleteNote={deleteNote} />
        ))}
      </ul>
    </div>
  );
}

export default Notes;
