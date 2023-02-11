import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const { name, email, password, confirm_password } = formData

  const dispatch = useDispatch()
  const {token, isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(isError){
        toast.error(message)
    }

    if(isSuccess && token){
        navigate('/verify')
    }

    if(isLoading){
      <Spinner/>
    }

    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, token, message, isLoading])

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== confirm_password){
        toast.error('passwords do not match')
    }else{
        const userInfo = {
            name,
            email,
            password
        }
        dispatch(register(userInfo))
    }
  }

 
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirm_password"
              className="form-control"
              id="password2"
              value={confirm_password}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
