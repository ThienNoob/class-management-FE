import React, { useState } from 'react'
import Form from '../components/Form/Form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        axios.post(process.env.REACT_APP_BASE_URL_AUTH + '/login', loginData)
        .then(res => {
            if (res.data.Status === "Success") {
                navigate('/');
            } else {
                alert(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div style={{ position: 'relative', backgroundColor: '#161925' }}>
            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                <Form type={'login'} formData={loginData} onChange={handleChange} onSubmit={handleSubmit}/>
            </section>
        </div>
    )
}

export default Login
