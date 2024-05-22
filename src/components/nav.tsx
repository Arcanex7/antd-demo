import React from "react";
// import './Nav.css'; // Make sure to import your CSS file
import './cssfiles/Nav.css';

const Nav = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <h3><a href="">FLoqer... </a></h3>
            </div>
            <div className="navbar-menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#support">Support</a></li>
                    <li><a href="#services">Services</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
