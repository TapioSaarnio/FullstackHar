import React from 'react';
import {Image} from 'react-bootstrap'
import code from "../imgs/code.png"

const Header = () => {

    const styles = {

        codeImg: {
            height: 37,
            width: 60,
            padding: 5,
        },
        header : {
            flexDirection: 'row',
            justifyContent: 'center'
        }
    }

    

    return(
        <div style={styles.header}>
            <Image style={styles.codeImg} src={code}/>
        
        </div>
    )
}

export default Header