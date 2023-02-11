import React, { useState, useEffect } from 'react'
import { MdVerified } from 'react-icons/md'
import { resendotp } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const ResendOtp = () => {
  const { isLoading, isSuccess, isError, message, success } = useSelector(
    (state) => state.auth
  )
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess && success) {
      if (success === 'OTP resent, check your email') {
        toast.success(success)
        setTimeout(() => {
          navigate('/verify')
        }, 1000)
      } else {
        toast.error(success)
      }
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message, success])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(resendotp(email))
  }

  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <>
          <section className="heading">
            <h1>
              <MdVerified /> Resend OTP
            </h1>
            <p>Input Email Used For Registration</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Resend OTP
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  )
}

export default ResendOtp
