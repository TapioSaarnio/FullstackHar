import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const SignIn = async (password, username) => {

    try {
    console.log(password)
    console.log(username)
    const response = await axios.post(baseUrl, password)
    console.log('signin')
    console.log(response.data)
    return response.data
    } catch(e) {
        console.log('error')
        console.log(e.response.data)
        return e
    }

}


export default SignIn