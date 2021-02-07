import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import {FaBeer} from 'react-icons/fa'

import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'

import getAllProducts from '../services/products'
import {login} from '../services/users'
import LoginModal from './LoginModal'


const Products =() => {

    
    const [products, setProducts] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signInModalOpen, setSignInModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const openLoginModal = () => {
        console.log('openLoginModal')
        setLoginModalOpen(true)
    }
    const closeLoginModal = () => setLoginModalOpen(false)
    const openSignInModal = () => setSignInModalOpen(true)

    useEffect(() => {
        console.log('useeffect')
        getAllProducts().then(p => {
            setProducts(p)
        })
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await login({username, password})

            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {

            setErrorMessage('Väärät tunnukset')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)

        }
    }


    const loginAndSignIn = () => (


            <div id='login'>
                <Button id='loginButton' onClick = {() => openLoginModal()}>Kirjaudu sisään</Button>
                <Button id='signInButton'>Luo tunnukset</Button>
            </div>

    )

    const loggedInForm = () => (

        <div>
            <p>Olet kirjautunut sisään käyttäjänimellä '{username}'</p>
        </div>
    )

    
    

    if(products) {
        console.log('products löyty')

    return(
        

        <div className='content'>
            <div>
            <Link to='/'>
            <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
            </Link>
            </div>
            <LoginModal loginModalOpen={loginModalOpen} onClose={closeLoginModal} error={errorMessage}/>
            {user === null ? loginAndSignIn() : loggedInForm()}
            {products.map(p =>
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