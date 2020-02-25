import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const login = () => {
    const { register, handleSubmit } = useForm();

    function onSubmit(data){
        axios('http://localhost:5000/api/auth/login')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name='username'/>>
            <input name='password' type='password' ref={register}/>
            <input type='submit'/>>
        </form>
    )
};

export default login;