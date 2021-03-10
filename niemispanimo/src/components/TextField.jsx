import React from 'react'
import {Field, ErrorMessage } from 'formik'
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";

export const TextField = ({field, label, placeholder, showText}) => {
    return(
    <Form.Field>
        <Field placeholder={placeholder} type={showText ? 'text' : 'password' } {...field} />
        <div style={{color: 'red'}}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
    )
};

