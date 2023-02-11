import { useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verify } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

const Verification = () => {
  const [otp, setOtp] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, isLoading, isSuccess, isError, message, success } =
    useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (token && isSuccess && success) {
      if (success === 'Verification successful') {
        toast.success(success)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else {
        toast.error("An error occurred")
      }
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message, token, success])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(verify(otp, token))
  }

  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <>
          <section className="heading">
            <h1>
              <MdVerified /> Verify
            </h1>
            <p>Input The OTP Sent To Your Email</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="otp"
                  className="form-control"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your otp"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
                <Link to={'/resendotp'}>
                  <span>Resend OTP</span>
                </Link>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  )
}

export default Verification
