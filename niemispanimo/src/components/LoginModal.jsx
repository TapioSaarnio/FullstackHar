import React from 'react'
import { Modal, Header, Segment } from 'semantic-ui-react';
import {Button} from 'react-bootstrap'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import {TextField} from './TextField'



const LoginModal = ({onSubmit, loginModalOpen, onClose, error}) => {


    return(
        <Modal open={loginModalOpen} onClose={onClose} centered={true} closeIcon>
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
                {() => {
                    return (
                        <div id='formDiv'>
                        <Form className='form-ui'>
                        <div id='username'>
                        <Field
                        label='Käyttäjänimi'
                        placeholder='Käyttäjänimi'
                        name='username'
                        showText = {true}
                        component={TextField}
                        />
                        </div>
                        <div id='password'>
                        <Field
                        label='Salasana'
                        placeholder='Salasana'
                        name='password'
                        showText = {false}
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

