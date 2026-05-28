function NoteItem({ note, deleteNote }) {
  return (
    <div className="note-item">
      <h4>
        {note?.subject} - {note?.topic}
      </h4>

      <p>
        <strong>Type:</strong> {note?.type}
      </p>

      <p>{note?.generatedText}</p>

      <button
        onClick={() => deleteNote(note?._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;