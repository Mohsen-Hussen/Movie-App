import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <Link to="/">
                    <img className="rmdb-logo" src="./image/reactMovie_logo.png" alt="rmdb-logo" />
                </Link>
                <img className="rmdb-tmdb-logo" src="./image/tmdb_logo.png" alt="tmdb-logo" />
            </div>
        </div>
    )
}

export default Header;