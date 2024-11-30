import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ loadSampleData }) => {
    return (
        <header className="header">
            <nav>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Home
                </NavLink>
                <NavLink
                    to="/create"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Create Post
                </NavLink>
                <button onClick={loadSampleData} className="load-sample-data">
                    Load Sample Data
                </button>
            </nav>
        </header>
    );
};

export default Header;
