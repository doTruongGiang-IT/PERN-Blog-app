import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';
import useOnScreen from '../../hooks/useOnScreen';

const RegisterPage = ({history}) => {
    if(localStorage.getItem("pern_blog_auth")) history.push("/");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const isEmailVisible = useOnScreen(emailRef);
    const isPasswordVisible = useOnScreen(passwordRef);

    let register = async (username, email, password) => {
        const res = await axios.post(`http://localhost:5000/api/auth/register`, {username, email, password, profile: ""});
        res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
        res.data && history.push("/");
        setUsername("");
        setEmail("");
        setPassword("");
    };

    let isDisabled = () => {
        let result = false;

        if(!username || !email || !password || isEmailVisible || isPasswordVisible) result = true;
        return result;
    };

    return (
        <div className="register">
            <span className="register-title">Register</span>
            <form className="register-form">
                <label>Username</label>
                <input className="register-input" type="text" placeholder="Enter your username..." value={username} onChange={e => setUsername(e.target.value)} />
                <label>Email</label>
                <input pattern='[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]' id="email" className="register-input" type="email" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} />
                <p ref={emailRef} className="register-email-errors">Please fill in the right format of email</p>
                <label>Password</label>
                <input pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' id="password" className="register-input" type="password" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} />
                <p ref={passwordRef} className="register-password-errors">Password must includes lower-upper-number-special chars</p>
                <button disabled={isDisabled()} type="button" onClick={() => register(username, email, password)} className="register-button">Register</button>
            </form>
            <button className="register-login-button">
                <Link className="link" to="/login">Login</Link>
            </button>
        </div>
    )
}

export default RegisterPage;
