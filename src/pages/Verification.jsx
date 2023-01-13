import { useEffect, useState } from "react";
import {MdVerified} from 'react-icons/md'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { verify } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";
import { reset } from '../features/auth/authSlice'


const Verification = () => {
    const [otp, setOtp] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token, isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)

  

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(token && isSuccess){
            setTimeout(()=>{
                toast.success("Your Account Has Been Verified")
            }, 1000)
            navigate('/login')
        }
        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message, token])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(verify(otp, token))
    }

    if(isLoading){
        <Spinner/>
    }

   

   



  return (
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
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="Enter your otp"
              required
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Verification
