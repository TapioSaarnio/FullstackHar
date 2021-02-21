import { Field, Form, ErrorMessage } from 'formik'




export const TextArea = ({field, label, placeholder}) => {

    return(
        <div>
            <label>{label}</label>
            <Field style={{resize: 'none'}} rows="5" cols="25" as='textarea' id='reviewText' placeholder='Kuvaus'  {...field}/>
            </div>

    )
}

export default TextArea