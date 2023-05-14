import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logout } from "./redux/userSlice";


const ProtectedRoute = () => {

  const user = useSelector((State)=>State.user.user);
  const isAdmin = useSelector((state)=>state.user.isAdmin);

  // console.log('user from protected route',user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return user && isAdmin ? (
    <>
      <button className="btn-dash" onClick={()=>navigate('/')}>home</button>
      <br />
      <button className="btn-dash" onClick={()=>handleLogout()}>logout</button>
      <h1>bonjour {user.nomadministrateur}</h1>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
