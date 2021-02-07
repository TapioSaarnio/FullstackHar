import React from 'react'
import { Modal, Header, Segment } from 'semantic-ui-react';
import {Button} from 'react-bootstrap'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import {TextField} from './TextField'


const LoginModal = ({loginModalOpen, onClose, error}) => {



    const onSubmit = values => {
        console.log('Form data', values)

    }
    
    console.log(loginModalOpen)
    console.log('loginModalOpen')
    

    return(
    <Modal open={loginModalOpen} onClose={onClose} centered={false} closeIcon>
        <Header textAlign='center'>Kirjaudu Sisään</Header>
        <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Formik 
        initialValues={{username:'', password:''}}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = 'Täytä kenttä!';
            const errors = {};
            if(!values.username) {
                errors.username = requiredError;
            }
            if(!values.password) {
                errors.password = requiredError;
            }
            return errors;
        }}
        >
            {( {isValid, dirty} ) => {
                return (
                    <div id='formDiv'>
                    <Form className='form-ui'>
                    <div id='username'>
                    <Field
                    label='Käyttäjänimi'
                    placeholder='Käyttäjänimi'
                    name='username'
                    component={TextField}
                    />
                    </div>
                    <div id='password'>
                    <Field
                    label='Salasana'
                    placeholder='Salasana'
                    name='password'
                    component={TextField}
                    />
                    </div>
                    <div id='loginButtonModalDiv'>
                    <Button id='loginButtonModal' type='submit'>Inee</Button>
                    </div>
                </Form>
                </div>
                );
            }}

        </Formik>
        </Modal.Content>

    </Modal>
    )
    
}

export default LoginModal

