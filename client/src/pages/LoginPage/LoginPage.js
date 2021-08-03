import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import useOnScreen from '../../hooks/useOnScreen';
// import { Context } from '../../context/Context';

const LoginPage = ({history}) => {
    if(localStorage.getItem("pern_blog_auth")) history.push("/"); 
    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const {dispatch, user} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const isEmailVisible = useOnScreen(emailRef);
    const isPasswordVisible = useOnScreen(passwordRef);

    let login = async (email, password) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/login`, {email, password});
            res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
            res.data && history.push("/");
        } catch (error) {

        };
        setEmail("");
        setPassword("");
    };

    let isDisabled = () => {
        let result = false;
        if(!email || !password || isEmailVisible || isPasswordVisible) result = true;
        return result;
    };

    return (
        <div className="login">
            <span className="login-title">Login</span>
            <form className="login-form">
                <label>Email</label>
                <input 
                    id="email"
                    className="login-input" 
                    type="email"
                    placeholder="Enter your email..." 
                    pattern='[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]'
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <p ref={emailRef} className="login-email-errors">Please fill in the right format of email</p>
                <label>Password</label>
                <input 
                    id="password"
                    className="login-input" 
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    type="password"
                    placeholder="Enter your password..." 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
                <p ref={passwordRef} className="login-password-errors">Password must includes lower-upper-number-special chars</p>
                <button disabled={isDisabled()} onClick={() => login(email, password)} type="button" className="login-button">Login</button>
            </form>
            <button className="login-register-button">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}

export default LoginPage;
