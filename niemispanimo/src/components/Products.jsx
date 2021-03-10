import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import {FaBeer} from 'react-icons/fa'
import axios from 'axios'
import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'
import ReactJsAlert from "reactjs-alert"

import getAllProducts from '../services/products'
import SignIn from '../services/users'
//import Login from '../services/login'
import LoginModal from './LoginModal'
import SignInModal from './SignInModal'
import LeaveReviewModal from './LeaveReviewModal'
import ReadReviews from './ReadReviewsModal'
import ReadReviewsModal from './ReadReviewsModal'
const signUpUrl = 'http://localhost:3001/api/users'
const loginUrl = 'http://localhost:3001/api/login'
const leaveReviewUrl = 'http://localhost:3001/api/reviews'


const Products =() => {

    
    const [products, setProducts] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [beer, setBeer] = useState(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signInModalOpen, setSignInModalOpen] = useState(false)
    const [leaveReviewModalOpen, setLeaveReviewOpen] = useState(false)
    const [readReviewsModalOpen, setReadReviewsModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const openLeaveReviewModal = (product) => {

        if(user){
            setProduct(product)
            setLeaveReviewOpen(true)
        } else {

            alert('kirjaudu sisään jättääksesi arvostelun')
        }

    }

    const closeLeaveReviewModal = () => setLeaveReviewOpen(false)



    const openLoginModal = () => {
        console.log('openLoginModal')
        setLoginModalOpen(true)
    }

    const openReadReviewsModal = (product) => {

        setProduct(product)
        setReadReviewsModalOpen(true)
    }

    const openSignInModal = () => {
        console.log('openSignInModal')
        setSignInModalOpen(true)
    }
    const closeReadReviewsModal = () => setReadReviewsModalOpen(false)
    const closeLoginModal = () => setLoginModalOpen(false)
    const closeSignInModal = () =>{

      console.log('closeSignInModal')
      setSignInModalOpen(false);
    }


    useEffect(() => {
        console.log('useeffect')
        getAllProducts().then(p => {
            setProducts(p)
        })
    }, [])



    const handleLogin = async (values) => {
        try{
        console.log('login')
        const response = await axios.post(loginUrl, values)
        const user = response.data
        setUser(user)
        console.log('user')
        console.log(user)
        } catch(e) {
            setErrorMessage(`Käyttäjätunnus tai salasana väärin`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        
            closeLoginModal()
        

    }

    const handleLogOut = () => {

        setUser(null)

    }

    const handleLeaveReview = async (values) => {

        console.log('values')
        console.log(values)

        await axios.post(leaveReviewUrl, values)
        closeLoginModal()
         
    }

    const handleSignIn = async (values) => {


        try {
         console.log(password)
            console.log(username)
            const response = await axios.post(signUpUrl, values)
            console.log('signin')
            console.log(response.data)
            return response.data
            } catch(e) {
                console.log('error')
                console.log(e.response.data)
                setErrorMessage(`Käyttäjätunnus "${values.username}" on jo olemassa`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)

                return
                
            }

            closeSignInModal()


        
        /*
        console.log('handlesignin')
        console.log(values.username)
        console.log(values.password)

        try{
        const response = SignIn(values)
        if(response.e){
            console.log(response.e)
        }
        
        } catch (exception) {
            setErrorMessage('Väärät tunnukset')
            console.log('errormessage')
            console.log(errorMessage)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        */

        


    }


    const loginAndSignIn = (handleLogin, handleSignIn) => (


            <div id='login'>
                <Button id='loginButton' onClick = {() => openLoginModal(handleLogin)}>Kirjaudu sisään</Button>
                <Button id='signInButton' onClick = {() => openSignInModal(handleSignIn)}>Luo tunnukset</Button>
            </div>

    )

    const loggedInForm = () => (

        <div id='loggedIn'>
            <p>Olet kirjautunut sisään käyttäjänimellä "{user.username}"</p>
            <Button id='logOutButton' onClick = {() => handleLogOut()}>Kirjaudu ulos</Button>
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
            <LoginModal onSubmit={handleLogin} loginModalOpen={loginModalOpen} onClose={closeLoginModal} error={errorMessage}/>
            <SignInModal onSubmit={handleSignIn} signInModalOpen={signInModalOpen} onClose={closeSignInModal} error={errorMessage}/>
            <LeaveReviewModal onSubmit={handleLeaveReview} leaveReviewModalOpen={leaveReviewModalOpen} onClose={closeLeaveReviewModal} error={errorMessage} product={product} user={user}/>
            <ReadReviewsModal readReviewsModalOpen={readReviewsModalOpen} onClose={closeReadReviewsModal} error={errorMessage} product={product} />
            {user === null ? loginAndSignIn(handleLogin, handleSignIn) : loggedInForm()}
             
            {products.map(p =>

                <Card>
                        <Card.Img  src={p.image} className='cardPicture'/>

             <Card.Body>

                 <div className='description'>
                 <Card.Text >{p.description}</Card.Text>
                 </div>
                <div id='reviewButtons'>
                 <Button id='readReviewsButton' onClick={() => openReadReviewsModal(p)}>Lue arvosteluja</Button>
                 <Button onClick={() => openLeaveReviewModal(p)}>Jätä arvostelu</Button>
                 </div>


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