import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function NotesPage() {
  const { logout } = useAuth();
  const [notes, setNotes] = useLocalStorage('dsa_notes', []);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  function addNote(event) {
    event.preventDefault();
    const next = text.trim();
    if (!next) return;
    setNotes((prev) => [{ id: Date.now(), text: next }, ...prev]);
    setText('');
    inputRef.current?.focus();
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return (
    <div className="home-content">
      <header className="home-header">
        <div className="home-title-row">
          <h1>Prep notes</h1>
          <p className="home-subtitle">A small notes app — forms, lists, and protected routing.</p>
        </div>
        <button type="button" className="reset-all-btn" style={{ width: 'auto' }} onClick={logout}>
          Log out
        </button>
      </header>

      <form className="simple-form" onSubmit={addNote}>
        <label htmlFor="note-text">New note</label>
        <input
          id="note-text"
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Revise two pointers tonight"
        />
        <button type="submit" className="primary-btn">Add note</button>
      </form>

      {notes.length === 0 ? (
        <p className="home-subtitle">No notes yet. Add one above.</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <span>{note.text}</span>
              <button type="button" className="qa-btn qa-reset" onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
