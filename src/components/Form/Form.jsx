import { Button, TextField } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Form = ({ type, formData, onChange, onSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange && onChange(name, value);
    };
    const handleSubmit = (e) => {
      if (e) e.preventDefault();

      const isAnyFieldEmpty = Object.values(formData).some(value => value.trim() === '');
      if (isAnyFieldEmpty) {
          alert('Please fill in all fields');
          return;
      }
      onSubmit();
  };

    return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '500px', backgroundColor: '#1C1F2E', color: 'white', padding: '20px', borderRadius: '8px', gap: '30px'}}>
        <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          InputProps={{
            style: { color: 'white' }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          style={{ backgroundColor: '#282c34', borderRadius: '4px' }}
          required
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          InputProps={{
            style: { color: 'white' }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          style={{ backgroundColor: '#282c34', borderRadius: '4px' }}
          required
        />
        {type === 'register' && (
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            style={{ backgroundColor: '#282c34', borderRadius: '4px' }}
            required
          />
        )}
        <Button variant="contained" type="submit" style={{ backgroundColor: '#0E78F9', color: 'white' }}>
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
        <Link to={ type === 'login' ? '/register' : '/login' } style={{ display: 'flex', color: 'white', justifyContent: 'end' }}>
           {type === 'login' ? 'No account yet? Register' : 'Already have an account? Login'}
        </Link>
      </form>
    </div>
    )
}

export default Form
