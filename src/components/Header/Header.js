import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div className='header'>
            <img src={logo} alt="" srcSet=""/>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">order review</Link>
                <Link to="/manage">Manage inventory</Link>
                <button onClick={()=>setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;