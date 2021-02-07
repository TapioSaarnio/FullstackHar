import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const login = async (password, username) => {

    const response = await axios.post(baseUrl, password, username)
    console.log('login')
    console.log(response.data)
    return response.data

}