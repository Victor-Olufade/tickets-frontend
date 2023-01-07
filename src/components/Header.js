import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  const { user } = useSelector((state) => state.auth)
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
            <li>
                <button onClick={onLogout} className='btn'><FaSignOutAlt/>logout</button>
            </li>
        ) : (
            <>
             <li>
             <Link to="/login">
               <FaSignInAlt /> login
             </Link>
           </li>
           <li>
             <Link to="/register">
               <FaUser /> register
             </Link>
           </li>
            </>
        )}
       
      </ul>
    </header>
  )
}

export default Header
