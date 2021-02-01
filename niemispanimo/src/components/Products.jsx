import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import {FaBeer} from 'react-icons/fa'

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
            <div>
            <Link to='/'>
            <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
            </Link>
            </div>
            {products.products.map(p =>
                <Card>
                        <Card.Img  src={p.image} className='cardPicture'/>

             <Card.Body>

                 <div className='description'>
                 <Card.Text>{p.description}</Card.Text>
                 </div>
              
                 <Button>Lue arvosteluja</Button>
                 <Button>Jätä arvostelu</Button>


             </Card.Body>
             </Card>
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