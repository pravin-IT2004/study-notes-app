import NoteItem from "./NoteItem";

function NotesList({ notes = [], deleteNote }) {
  return (
    <div className="card output-card">
      <h3>Generated Notes</h3>

      <div className="output">
        {notes.length === 0 ? (
          <p>
            Your AI-generated notes will appear here...
          </p>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;