import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/Root.css';

const Root = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <section class='main__content'>
          <div style={{ width: '100%' }}>
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Root
