import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Newticket = () => {
  const { user } = useSelector((state) => state.auth)
  const [name, setName] = useState(user.trueUser && user.trueUser.name)
  const [email, setEmail] = useState(user.trueUser && user.trueUser.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const onSubmit = () => {}
  return (
    <>
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
            <option value='iPhone'>iPhone</option>
            <option value='MacBook Air'>MacBook Air</option>
            <option value='iMac'>iMac</option>
            <option value='iPad'>iPad</option>
          </select>
            </div>
            <div className="form-group">
                <label htmlFor='description'>Description of issue</label>
                <textarea name='description' id='description' className='form-control' placeholder='describe issue' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>
            <div className="form-group">
                <button className='btn btn-block'>
                    Submit
                </button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Newticket
