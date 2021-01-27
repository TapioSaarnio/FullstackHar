import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'

import getAllProducts from '../services/products.js'


const Products =() => {

    
    const [products, setProducts] = useState(null)

    useEffect(() => {
        console.log('useeffect')
        getAllProducts().then(p => {
            setProducts(p)
        })
    }, [])

    
    

    if(products) {
        console.log('products löyty')

    return(
        

        <div className='content'>
            <Link to='/'>
            <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
            </Link>
            {products.products.map(p =>
            <div className = 'cardDiv'>
                <Card>
             <Card.Img variant='top' src={p.image} className='cardPicture'/>
             <Card.Body>
                 <div className='cardSpecs'>
                 <Card.Text>{p.description}</Card.Text>
                 </div>
                 <Button variant='primary'></Button>

                 
                 
             </Card.Body>
             </Card>
            </div>
            )}
            
        </div>

    )
    }
    else {
        return(
        <div>
            <p>fetching products</p>
        </div>
        )
    }
}

export default Products