import React from 'react'
import {Modal, Header, Segment} from 'semantic-ui-react'
import {Card} from 'react-bootstrap'

import { FaBeer } from 'react-icons/fa'
const ReadReviewsModal = ({onSubmit, readReviewsModalOpen, onClose, error, product}) => {

    if(product){

    return(
        <Modal open={readReviewsModalOpen} onClose={onClose} centered={true} closeIcon>
            <Header textAlign='center'>Arvostelut</Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <div id='reviews'>
                    {product.reviews.map(r => {

                            return(
                                <div id='review'>
                            <div id='reviewsTop'>
                            <p>{r.user.username}</p>
                            <div id='reviewVerdict'>
                            {[...Array(r.verdict)].map(b => <FaBeer size={20} />)}
                            </div>
                            </div>
                            <div id='reviewsContent'>
                            {r.description}
                            </div>
                            </div>
                            )

                        
                    })}

                </div>
                
            </Modal.Content>
        </Modal>
    )
}

    return(
        null
    )

    }
export default ReadReviewsModal

