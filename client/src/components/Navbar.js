import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/userSlice';

const Navbar = () => {
  const isAdmin = useSelector((state)=>state.user.isAdmin);
  const isUser = useSelector((state)=>state.user.isUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAdmin){
    return(
      <>
      <h1>admin</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Dashboard
        </NavLink>
        <button onClick={() => handleLogout()}>logout</button>
      </nav>
    </>
    );
  }
  if (isUser) {
    return (
      <>
        <h1>user</h1>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Contact
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Account
          </NavLink>
          <button onClick={() => handleLogout()}>logout</button>
        </nav>
      </>
    );}

  return (
    <>
      <h1>aucun</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Contact
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Account
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Login
        </NavLink>
      </nav>
    </>
  )
}

export default Navbar