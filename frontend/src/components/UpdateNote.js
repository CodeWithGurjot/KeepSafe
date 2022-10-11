import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import noteContext from '../context/notes/noteContext'

const UpdateNote = (props) => {
  const context = useContext(noteContext)
  const { editNote } = context

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [note, setNote] = useState({ _id: '', title: '', description: '' })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await editNote(note._id, note.title, note.description)
    handleClose()
    props.showAlert('Note Updated Successfully', 'success')
  }

  const handleClick = (currentNote) => {
    setNote({
      _id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
    })
    handleShow()
  }

  return (
    <>
      <i
        className="fa-solid edit fa-pen-to-square mx-5 fa-xl"
        onClick={() => {
          handleClick(props.note)
        }}
      ></i>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Update Note</h2>
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={handleUpdate}
          className="my-2 flex"
          style={{ width: '80%', marginLeft: '10%' }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                <h5>Title</h5>
              </Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                control-id="title"
                placeholder="Enter title here..."
                onChange={onChange}
                value={note.title}
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
                control-id="description"
                name="description"
                rows={10}
                placeholder="Type your content here..."
                value={note.description}
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
              Done
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default UpdateNote
