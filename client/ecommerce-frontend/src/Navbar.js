import React, {useContext} from 'react'
import styles from './cssFiles/Navbar.module.css'
import {Link} from 'react-router-dom'
import UserDisplay from './UserDisplay'
import { AuthContext } from './AuthContext'

function Navbar() {
  const {auth, isLoggedIn} = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <ul className={styles.navbarMenu}>
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.navbarLink}>Home</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/about" className={styles.navbarLink}>About</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/contact" className={styles.navbarLink}>Contact</Link>
          </li>
          {(isLoggedIn && auth.userType === 'SELLER') ? (
            <li className={styles.navbarItem}><Link to="/products" className={styles.navbarLink}>Products</Link></li>)
            : (<li></li>) }
        </ul>
        <div className={styles.iconOrButtons}>
            <UserDisplay />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar