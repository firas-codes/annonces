import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
// const url = "http://10.0.2.15:5001/server/auth/login";
const url = "/server/auth/login";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !email) return;

        const response = await axios.post(url, { email, password });

        const userData = await response.data;

        console.log("user data from login", userData);

        // const {user,token:userToken} = userData;

        const { user, isAdmin, isUser, token } = userData;

        console.log("user from login", user);
        // console.log("isAdmin from login", isAdmin);


        if (!user) {
            navigate("/");
            console.log("no user from login");
        } else {
            if (isAdmin) {

                dispatch(login({ user, isAdmin, isUser }));
                console.log("is admin");
                console.log("token from login", token);
                navigate("/dashboard");
            }
            if (isUser) {
                dispatch(login({ user, isAdmin, isUser }));
                console.log("is user");
                console.log("token from login", token);
                navigate("/");
            }
        }
    };

    return (
        <section className="section">
            <form className="form" onSubmit={handleSubmit}>
                <h5>login</h5>
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        email:
                    </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password" className="form-label">
                        password:
                    </label>
                    <input
                        type="password"
                        className="form-input"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-block">
                    login
                </button>
            </form>
            <h3>no account ? register here</h3>
            <NavLink to="/register">register</NavLink>
        </section>
    )
}

export default Login