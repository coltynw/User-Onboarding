
import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


const Login = ({values, errors, touched, status}) => {
    const [user, setUser] = useState([]);
    useEffect(() =>{
        if (status) {
            setUser([...user, status])
        }
    }, [status]);

    // creating the form and displaying the info 
    return(
        <div className='newLogin'>
            <Form>
                <Field type='text' name='name' placeholder='name' />
                {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
                <br></br>
                <Field type='email' name='email' placeholder='email' />
                {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                <br></br>
                <Field type='password' name='password' placeholder='password' />
                {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
                <br></br>
                <label>Checkbox<Field type='checkbox' name='terms' checked={values.terms} /></label>
                {touched.terms && errors.terms && (<p className='error'>{errors.terms}</p>)}
                <br></br>
                <button>submit</button>  
            </Form>
            {user.map(person => (
                <p key={person.id}>
                    <h1>Name: {person.name}</h1>
                    <a href='mailto:${person.email}'>Email: {person.email}</a>
                    <p>Password: {person.password}</p>
                </p>
            ))}
        </div>

    )}
// Formik validation
const FormikLogin = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Required field.'),
        email: Yup.string().required('Required field.'),
        password: Yup.string().required('Required field.'),
        terms: Yup.boolean().oneOf([true], 'Check the box please').required()
    }),
// the post request
    handleSubmit(values, {setStatus}){
        axios
            .post('https://reqres.in/api/users/', values)
            .then(response =>{
                console.log(response);
                setStatus(response.data);
            })
            .catch(error => console.log(error.response));
    }
})(Login)




export default FormikLogin; 