import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_KEY
  const initialNotes = []

  const [progress, setProgress] = useState(0);

  const [notes, setNotes] = useState(initialNotes)

  // API Call to Fetch all notes
  const fetchNotes = async (title, description) => {
    setProgress(40)
    const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        authToken:
          localStorage.getItem('keepSafeToken'),
      },
    })
    // Sending data to setNotes
    const data = await response.json()
    setNotes(data);
    setProgress(100)
  }

  //Add Note
  const addNote = async (title, description) => {
    setProgress(40)
    const response = await fetch(`${host}/api/v1/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        authToken:
          localStorage.getItem('keepSafeToken'),
      },
      body: JSON.stringify({ title, description }), // body data type must match "Content-Type" header
    })
    const data = await response.json()
    setNotes(notes.concat(data))
    setProgress(100)
  }

  // Edit a Note
  const editNote = async (id, title, description) => {
    setProgress(20)
    // API Call
    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        authToken:
          localStorage.getItem('keepSafeToken'),
      },
      body: JSON.stringify({ title, description}),
    })
    await response.json()
    setProgress(60)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        break
      }
    }
    setNotes(newNotes)
    setProgress(100)
  }

  //Delete Note
  const deleteNote = async (id) => {
    setProgress(40)
    const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        authToken:
          localStorage.getItem('keepSafeToken'),
      },
    })
    await response
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
    setProgress(100)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes, progress, setProgress }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
