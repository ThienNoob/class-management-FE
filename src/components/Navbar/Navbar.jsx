import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../../assets/logout.png';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL_AUTH)
    .then(res => {
      if (res.data.Status === "Success") {
        setAuthenticated(true);
        setEmail(res.data.user.email);
      } else {
        setAuthenticated(false);
        setOpenDialog(true);
        setMessage(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get(process.env.REACT_APP_BASE_URL_AUTH + '/logout')
    .then(res => {
      navigate('/login');
    }).catch(err => console.log(err));
  };

  return (
    <nav className={styles.navbar}>
        <Link to="/" className={styles.navbar__link}>
            <img
                src={Logo}
                alt="app logo"
                className={styles.navbarlink__logo}
            />
            <p className={styles.navbarlink__p}>
                Class Management
            </p>
        </Link>
        <section style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          <img src={logout} width={32} height={32} alt='logout' style={{ backgroundColor: 'white', borderRadius: '20px' }} onClick={handleLogout}/>
          <h3>{email}</h3>
        </section>
        {!authenticated && (
          <Dialog open={openDialog} fullWidth>
            <DialogTitle style={{ fontWeight: 'bold' }}>{message}</DialogTitle>
            <DialogContent>You are not authenticated. Please log in to continue.</DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => {navigate('/login'); setOpenDialog(false)}} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
        )}
    </nav>
  )
}

export default Navbar;