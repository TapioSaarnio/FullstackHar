import React from 'react'
import {FaInstagram} from 'react-icons/fa'


const BottomContainer = () => {

    const styles = {

        bottomContainer: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
        },

        streetCred: {

            color: '#93ea1f'
            
        },


        instagramText: {
            marginLeft: 5,
            fontWeight: 'bold',
            color: '#93ea1f'
        },

    }

    return(
        <div style={styles.bottomContainer}>
            <h2 id='streetCred'>Jyväskylän katu-uskottavin kotipanimo</h2>
            <div>
                <FaInstagram style={{backgroundColor: '#93ea1f', marginRight: 5}}/><span id='niemisPanimoIg'>niemispanimo</span>
            </div>
        </div>
    )
}

export default BottomContainer