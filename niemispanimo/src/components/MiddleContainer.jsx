import React from 'react'
import { Image } from 'react-bootstrap'
import KulmanPojat from'../imgs/kulmanPojat.png'
import Passion from '../imgs/passion.png'
import LifetimeDeal from '../imgs/lifetimeDeal.png'
import { Link } from 'react-router-dom'


const MiddleContainer = () => {

    const styles = {
        middleContainer: {
            display: 'flex',
            flex: 3,
            backgroundColor: 'black',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexShrink: 1
        }
    }

    return (
            <div style={styles.middleContainer}>
                <div class='frontPageChoices'>
                    <Link to='./Galleria'>
                        <img class='frontPageImgs' alt='Kulman Pojat' src={KulmanPojat}/>
                    </Link>
                    <p class='frontPageChoicesText'>Kuvagalleria</p>
                </div>
                <div class='frontPageChoices'>
                    <Link to='./Tuotteet'>
                        <img class='frontPageImgs' alt='Passion' src={Passion}/>
                    </Link>
                    <p class='frontPageChoicesText'>Tuotteet</p>
                </div>
                <div class='frontPageChoices'>
                    <a href='https://www.youtube.com/watch?v=YbpaPkZojxA&t=1142s&ab_channel=Kulmanpojat'>
                        <img class='frontPageImgs' alt='Lifetime Deal' src={LifetimeDeal}/>
                    </a>
                    <p class='frontPageChoicesText'>Videot</p>
                </div>
            </div>
    ) 
}

export default MiddleContainer