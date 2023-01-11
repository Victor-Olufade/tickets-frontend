import axios from "axios";

const BASE_URL = process.env.REACT_APP_LOCAL_URL

const register = async(userData)=>{
    const response = await axios.post(`${BASE_URL}/api/users`, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('user')
}

const login = async(userData) => {
    const response = await axios.post(`${BASE_URL}/api/users/login`, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

const authService = {
    register,
    logout,
    login
}

export default authService