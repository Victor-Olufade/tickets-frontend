import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { createNote, getNotes} from '../features/notes/noteSlice'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  )
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  )
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicket(params.id))
    dispatch(getNotes(params.id))
  }, [isError, message, params.id, dispatch])

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    ;<h3>Something went wrong</h3>
  }

  const onTicketClose = () => {
    dispatch(closeTicket(params.id))
    toast.success('Ticket closed')
    navigate('/tickets')
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, id: params.id}))
    closeModal()
  }

  return (
    <>
    {ticket && 
    <div className="ticket-page">
    <header className="ticket-header">
      <Backbutton url="/tickets" />
      <h2>
        Ticket ID: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
      </h2>
      <h3>
        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-NG')}
      </h3>
      <h3>Product: {ticket.product}</h3>
      <hr />
      <div className="ticket-desc">
        <h3>Description of issue</h3>
        <p>{ticket.description}</p>
      </div>
      <h2>Notes</h2>
    </header>
    {ticket.status !== 'closed' && (
      <button onClick={openModal} className="btn">
        <FaPlus />
        Add Note
      </button>
    )}

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Note"
    >
      <h2>Add Note</h2>
      <button onClick={closeModal} className="btn-close">
        X
      </button>
      <form onSubmit={onNoteSubmit}>
        <div className="form-group">
          <textarea
            id="noteText"
            name="noteText"
            className="form-control"
            placeholder="Note Text"
            value={noteText}
            onChange={(e) => {
              setNoteText(e.target.value)
            }}
          ></textarea>
        </div>
        <div className="form-group">
          <button type='submit' className="btn">
              Submit
          </button>
        </div>
      </form>
    </Modal>

    {notes && notes.map((note) => (
      <NoteItem key={note._id} note={note} />
    ))}

    {ticket.status !== 'closed' && (
      <button className="btn btn-block btn-danger" onClick={onTicketClose}>
        Close Ticket
      </button>
    )}
  </div>}
    </>
  )
}

export default Ticket
