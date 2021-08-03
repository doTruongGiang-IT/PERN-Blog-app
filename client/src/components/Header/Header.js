import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
           <div className="header-title">
                <span>P.E.R.N</span>
                <span>Blog</span>
           </div> 
           <img src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="banner" />
        </header>
    )
}

export default Header;
