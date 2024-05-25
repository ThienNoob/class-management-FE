import React, { useState } from 'react'
import Form from '../components/Form/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (name, value) => {
    setRegisterData({
      ...inputData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (inputData.password !== inputData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const { confirmPassword, ...registerData } = inputData;
    axios.post(process.env.REACT_APP_BASE_URL_AUTH + '/register', registerData)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/login');
      } else {
        alert(res.data.Error);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div style={{ position: 'relative', backgroundColor: '#161925' }}>
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <Form type={'register'} formData={inputData} onChange={handleChange} onSubmit={handleSubmit}/>
        </section>
    </div>
  )
}

export default Register
