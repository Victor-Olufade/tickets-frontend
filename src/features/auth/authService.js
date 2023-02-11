import axios from "axios";

const BASE_URL = process.env.REACT_APP_DEPLOYED_URL

const register = async(userData)=>{
    const response = await axios.post(`${BASE_URL}/api/users`, userData)
    if(response.data.token){
        localStorage.setItem('token', JSON.stringify(response.data.token))
    }
    return response.data.token;
}

const logout = () => {
    localStorage.removeItem('user')
}

const verify = async(otp, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BASE_URL}/api/users/verify`, {otp}, config)
    return response.data.message
}

const login = async(userData) => {
    const response = await axios.post(`${BASE_URL}/api/users/login`, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

const resendOtp = async(email) => {
    const response = await axios.post(`${BASE_URL}/api/users/resendotp`, {email})
    return response.data.message;
}

const authService = {
    register,
    logout,
    login,
    verify,
    resendOtp
}

export default authService