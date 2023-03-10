import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const onSubmit = (e) => {
    e.preventDefault()
    const userInfo = {
      email,
      password,
    }
    dispatch(login(userInfo))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess && user) {
      navigate('/')
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message, user])

  if (isLoading) {
    ;<Spinner />
  }
  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <>
          <section className="heading">
            <h1>
              <FaSignInAlt /> Login
            </h1>
            <p>Please Login</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
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
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
              <Link to="/verify">
                <p>Click to verify your account first</p>
              </Link>
            </form>
          </section>
        </>
      )}
    </>
  )
}

export default Login
