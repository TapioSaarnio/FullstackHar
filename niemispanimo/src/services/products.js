import axios from 'axios'
const baseUrl = 'http://localhost:3001/products'



const getAllProducts = async() => {

    const response = await axios.get(baseUrl)

    console.log(response)

    return response.data


}