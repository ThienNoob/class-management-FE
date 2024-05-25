import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { sidebarLinks } from '../../constants/index.js'

const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    return (
    <section className={styles.sidebar}>
        <div className={styles.sidebar__div}>
        {sidebarLinks.map((item) => (
            <Link
                to={item.route}
                key={item.label}
                className={styles.sidebar__link}
                onClick={() => handleItemClick(item.route)}
                style={{ backgroundColor: activeItem === item.route ? '#0E78F9' : 'transparent' }}
            >
                <img src={item.imgURL} alt={item.label} style={{ width: '24px', height: '24px'}} />
                <p className={styles.sidebar__content}>{item.label}</p>
            </Link>
        ))}
        </div>
    </section>
    )
}

export default Sidebar
