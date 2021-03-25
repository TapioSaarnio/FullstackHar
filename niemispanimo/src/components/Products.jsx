import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'
import getAllProducts from '../services/products'
import LoginModal from './LoginModal'
import SignInModal from './SignInModal'
import LeaveReviewModal from './LeaveReviewModal'
import ReadReviewsModal from './ReadReviewsModal'
import AddBeerModal from './AddBeerModal'
const signUpUrl = 'http://localhost:3001/api/users'
const loginUrl = 'http://localhost:3001/api/login'
const leaveReviewUrl = 'http://localhost:3001/api/reviews'
const addBeerUrl = 'http://localhost:3001/api/products'



const Products =() => {

    const [products, setProducts] = useState(null)
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signInModalOpen, setSignInModalOpen] = useState(false)
    const [addBeerModalOpen, setAddBeerModalOpen] = useState(false)
    const [leaveReviewModalOpen, setLeaveReviewOpen] = useState(false)
    const [readReviewsModalOpen, setReadReviewsModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getAllProducts().then(p => {
            setProducts(p)
        })
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const openLeaveReviewModal = (product) => {

        if(user){   

            setProduct(product)
            setLeaveReviewOpen(true)

        } else {

            alert('kirjaudu sisään jättääksesi arvostelun')

        }

    }


    const openLoginModal = () =>  setLoginModalOpen(true)
    const openSignInModal = () => setSignInModalOpen(true)
    const openAddBeerModal = () => setAddBeerModalOpen(true)
    const closeAddBeerModal = () => setAddBeerModalOpen(false)
    const closeReadReviewsModal = () => setReadReviewsModalOpen(false)
    const closeLoginModal = () => setLoginModalOpen(false)
    const closeLeaveReviewModal = () => setLeaveReviewOpen(false)
    const closeSignInModal = () => setSignInModalOpen(false);
         
    const openReadReviewsModal = (product) => {

        setProduct(product)
        setReadReviewsModalOpen(true)

    }

    const handleLogin = async (values) => {

        try{

            const response = await axios.post(loginUrl, values)
            const user = response.data
            setUser(user)
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
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

        window.localStorage.clear()
        setUser(null)

        

    }

    const handleLeaveReview = async (values) => {

        await axios.post(leaveReviewUrl, values)
        closeLoginModal()
         
    }

    const handleSignIn = async (values) => {

        console.log('values')
        console.log(values)

        try {
            const response = await axios.post(signUpUrl, values)
            return response.data
            } catch(e) {
                setErrorMessage(`Käyttäjätunnus "${values.username}" on jo olemassa`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                return
            }
    }

    const handleAddBeer = async (values) => {

        console.log('addbeervalues')
        console.log(values)

        let data = new FormData();
        data.append("file", values.file)
        data.append("name", values.name)
        data.append("description", values.description)


        try {
            const response = await axios.post(addBeerUrl, data)
            return response.data
        } catch(e) {
            console.log(e)
            setErrorMessage('jotain meni vikaan')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }


    }


    const loginAndSignIn = (handleLogin, handleSignIn) => (

            <div id='login'>
                <Button id='loginButton' onClick = {() => openLoginModal(handleLogin)}>Kirjaudu sisään</Button>
                <Button id='signInButton' onClick = {() => openSignInModal(handleSignIn)}>Luo tunnukset</Button>
            </div>

    )


    const loggedInForm = () => {

        if(user.admin === true) {

            console.log('useradmin')
            return(
                <div id='loggedIn'>
                    <p>Olet kirjautunut sisään käyttäjänimellä "{user.username}"</p>
                    <Button id='logOutButton' onClick = {() => handleLogOut()}>Kirjaudu ulos</Button>
                    <Button id='addBeerButton'onClick = {() => openAddBeerModal()}>Uus Bisse</Button>
                </div>
                )

        }

        return(
        <div id='loggedIn'>
            <p>Olet kirjautunut sisään käyttäjänimellä "{user.username}"</p>
            <Button id='logOutButton' onClick = {() => handleLogOut()}>Kirjaudu ulos</Button>
        </div>
        )

    }

    if(products) {
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
                <AddBeerModal onSubmit={handleAddBeer} addBeerModalOpen={addBeerModalOpen} onClose={closeAddBeerModal} error={errorMessage} />
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
                        <Button id='leaveReviewButton' onClick={() => openLeaveReviewModal(p)}>Jätä arvostelu</Button>
                    </div>
                </Card.Body>
                </Card>
            )}            
            </div>
        )
    }
    else {

        return(
            null
        )

    }
}

export default Products