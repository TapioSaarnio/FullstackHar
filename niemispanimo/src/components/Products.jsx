import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'

import getAllProducts from '../services/products.js'


const Products = () => {

    const [products, setProducts] = useState(getAllProducts)



    return(

        <div className='content'>
            <Link to='/'>
            <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
            </Link>
        </div>

    )
}

export default Products