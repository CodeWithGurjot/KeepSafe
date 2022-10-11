import React, { useContext, useState } from 'react'
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext)
  const { addNote } = context

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [note, setNote] = useState({ title: '', description: '' })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    addNote(note.title, note.description)
    setShow(false)
    props.showAlert('Note Added Successfully', 'success')
  }

  return (
    <>
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip id="tooltip-top">
            <strong>Click to Add a Note</strong>
          </Tooltip>
        }
      >
        <Button
          variant="dark"
          size="lg"
          onClick={handleShow}
          style={{
            zIndex: '1',
            borderRadius: '50px',
            position: 'fixed',
            bottom: '50px',
            right: '50px',
            height: '4rem',
            width: '4rem',
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </OverlayTrigger>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Add Note</h2>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAdd} className="my-2 flex" style={{ width: '80%', marginLeft: '10%' }}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                <h5>Title</h5>
              </Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                placeholder="Enter title here..."
                onChange={onChange}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <h5>Content</h5>
              </Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                name="description"
                rows={10}
                placeholder="Type your content here..."
                onChange={onChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddNote
