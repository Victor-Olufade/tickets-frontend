import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/tickets'

const getNotes = async(id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BASE_URL}/${id}/notes`, config)
    return response.data.notes
}

const createNote = async(noteText, id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BASE_URL}/${id}/notes`, {text: noteText}, config)
    return response.data.note
}


const noteService = {
    getNotes,
    createNote
}

export default noteService