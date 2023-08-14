import Note from "./components/Note";
import { INote } from "./types/note";

function App() {
  const notes: INote[] = [
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
  ];

  return (
    <div>
      <h1>Lista beleski</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App;
