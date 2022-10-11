import React, { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import noteContext from '../context/notes/noteContext'
import UpdateNote from './UpdateNote'

const NoteItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context
  const { note, showAlert } = props
  return (
    <Col lg={3} md={6} sm={12} className="my-2">
      <Card className="shadow" style={{ width: '100%', height: 'auto' }}>
        <Card.Body>
          <div className="d-flex align-items-center">
            <Card.Title>{note.title}</Card.Title>
          </div>
          <Card.Text>{note.description}</Card.Text>
          <i
            className="fa-solid delete fa-trash-can fa-xl"
            onClick={() => {
              deleteNote(note._id)
              showAlert('Note Deleted Successfully', 'success')
            }}
          ></i>
          <UpdateNote showAlert={showAlert} note={note} />
        </Card.Body>
      </Card>
    </Col>
  )
}

export default NoteItem
