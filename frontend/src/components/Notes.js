import React, { useContext, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from '../components/AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, fetchNotes } = context

  useEffect(() => {
    if (localStorage.getItem('keepSafeToken')) {
      fetchNotes()
    } else {
      navigate('/login')
    }
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Container className="d-flex justify-content-center my-2 mb-5">
        <Container>
          <h2>Notes</h2>
          <div className="my-4 mx-2"><h4>{notes.length === 0 && 'Click on "+" button to add a note'}</h4></div>
          <Row>
            {notes.map((note) => {
              return <NoteItem showAlert={props.showAlert} key={note._id} note={note} />
            })}
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Notes
