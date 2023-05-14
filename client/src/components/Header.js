import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { AiOutlineMail } from "react-icons/ai";
import logo from '../assets/images/logo/logo.jpg';
const Header = () => {
  return (
    <header className="container">
      <div className="top-bar">
        <ul>
          <li>
            <a href="mailto:contact@annonces.tn">
              <AiOutlineMail className="header-icon" />
              contact@annonces.tn
            </a>
          </li>
        </ul>
      </div>
      <div className="header-logo" >
        <Link to="/">
          <img src={logo} alt='logo' id='header-logo'/>
        </Link>
      </div>
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <h2>annonces.tn</h2>
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  )
}

export default Header