import React,{useState, useEffect} from 'react'
import {MdVerified} from 'react-icons/md'
import { resendotp } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";


const ResendOtp = () => {
    const {isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            setTimeout(()=>{
                toast.success("OTP resent, check your email")
            }, 1000)
            navigate('/verify')
        }
        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resendotp(email))
    }

    if(isLoading){
        <Spinner/>
    }

  return (
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
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your otp"
              required
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Resend OTP</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ResendOtp
