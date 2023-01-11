import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_LOCAL_URL}/api/tickets`

const createTicket = async(ticketData, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(BASE_URL, ticketData, config)
   
    return response.data.ticket
}

const getTickets = async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(BASE_URL, config)
    return response.data.tickets
}

const getTicket = async(id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BASE_URL}/${id}`, config)
    return response.data.ticket
}

const closeTicket = async(id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${BASE_URL}/${id}`, {status: 'closed'}, config)
    return response.data.updatedTicket
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService