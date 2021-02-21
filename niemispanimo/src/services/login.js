import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'


export const Login = async (password, username) => {

    console.log('login')
    const response = await axios.post(baseUrl, password, username)
    
    console.log(response.data)
}

export default Login