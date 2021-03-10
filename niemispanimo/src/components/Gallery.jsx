import React from 'react'
import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'
import Arto from '../imgs/Arto.jpeg'
import Beer from '../imgs/Beer.jpeg'
import BeerTriangle from '../imgs/beerTriangle.jpeg'
import DonQs from '../imgs/DonQs.jpeg'
import Duel from '../imgs/Duel.jpeg'
import FreshWater from '../imgs/FreshWater.jpeg'
import Kegs from '../imgs/Kegs.jpeg'
import Koivuranta from '../imgs/Koivuranta.jpeg'
import Kuijo from '../imgs/Kuijo.jpeg'
import kulmanPojat from '../imgs/kulmanPojat.png'
import Premiere from '../imgs/Premiere.jpeg'
import Borsta from '../imgs/Borsta.jpeg'
import Brewing from '../imgs/Brewing.jpeg'
import Guest from '../imgs/Guest.jpeg'
import Jalasjarvi from '../imgs/Jalasjarvi.jpeg'
import Same from '../imgs/Same.jpeg'
import SeppaKuijo from '../imgs/SeppaKuijo.jpeg'
import Veke from '../imgs/Veke.jpeg'
import WoodenKeg from '../imgs/WoodenKeg.jpeg'
import panimoXliike from '../imgs/panimoXliike.jpeg'
import { Link } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {FaInstagram} from 'react-icons/fa'



const Gallery = () => {

    const photos = [
        {
            photo: Arto,
        
        },
        {
            photo: Beer
        },
        {
            photo: BeerTriangle
        },

        {
            photo: DonQs
        },
        {
            photo: Duel
        },
        {
            photo: FreshWater
        },
        {
            photo: Kegs
        },
        {
            photo: Koivuranta

        },
        {
            photo: Kuijo

        },
        {
            photo: Premiere
        },
        {
            photo: Borsta
        },
        {
            photo: Brewing
        },
        {
            photo: Guest
        },
        {
            photo: Jalasjarvi
        },
        {
            photo: Same
        },
        {
            photo: SeppaKuijo
        },
        {
            photo: Veke
        },
        {
            photo: WoodenKeg
        },

    ]

    return(
        <div className='content'>
            <Link to='/'>
            <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
            </Link>
            <Carousel width="800">
            
                    
                    {photos.map(pho=> <div><img alt=''src={pho.photo}/></div>)}
                     
                

                    </Carousel>



            <img src={panimoXliike}/>





        </div>
    )
}

export default Gallery