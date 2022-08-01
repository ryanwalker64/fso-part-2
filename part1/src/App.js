import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fullfilled')
        setNotes(response.data)
      })
    }
    console.log('render', notes.length, 'notes')

  useEffect(hook, [])
  
  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (e) => {
    e.preventDefault()
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObj))
    setNewNote('')

  }


  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>{showAll ? 'Important' : 'All'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note note={note} key={note.id}/> 
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}



export default App;
