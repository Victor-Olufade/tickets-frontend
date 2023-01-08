import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import Backbutton from '../components/Backbutton'

const Newticket = () => {
  const { user } = useSelector((state) => state.auth)
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )
  const [name] = useState(user.trueUser && user.trueUser.name)
  const [email] = useState(user.trueUser && user.trueUser.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  }, [isError, isSuccess, dispatch, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Backbutton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value)
              }}
            >
              <option value="iPhone">iPhone</option>
              <option value="MacBook Air">MacBook Air</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="describe issue"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Newticket
