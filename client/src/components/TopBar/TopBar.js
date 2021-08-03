import React, {useEffect, useState} from 'react';
import './TopBar.css';
import avatar from '../../assets/profile.png';
import { Link } from 'react-router-dom';
import fakeAuth from '../../assets/giang.png'

const TopBar = () => {
    const image = "http://localhost:5000/images/";
    const [user, setUser] = useState(() => localStorage.getItem("pern_blog_auth"));

    useEffect(() => {
        let auth = localStorage.getItem("pern_blog_auth");
        auth = JSON.parse(auth);
        setUser(auth);
        // if(auth !== null) {
        //     auth = JSON.parse(auth);
        //     setUser(auth);
        // }; 
    }, [user]);

    let showProfile = () => {
        let result = avatar;
        if(user !== null) {
            user.profile === "" ? result = fakeAuth : result = image+user.profile;
        };
        // let auth = localStorage.getItem("pern_blog_auth");
        // if(auth !== null) {
        //     auth = JSON.parse(auth);
        //     auth.profile === "" ? result = fakeAuth : result = image+auth.profile;
        // };
        return result;
    };

    let checkAuth = () => {
        let auth = localStorage.getItem("pern_blog_auth");
        if(auth === null) {
            window.location.replace("/login");
        }else {
            localStorage.removeItem("pern_blog_auth");
            setUser(null);
        };
    };

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <i className="top-icon fab fa-facebook-square"></i>
                <i className="top-icon fab fa-instagram-square"></i>
                <i className="top-icon fab fa-github-square"></i>
            </div>
            <div className="top-bar-mid">
                <ul className="top-list">
                    <li className="top-list-item">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/">CONTACT</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/create">WRITE</Link>
                    </li>
                    {
                        localStorage.getItem("pern_blog_auth") ?
                        <li className="top-list-item">
                            <Link className="link" to="/setting">SETTING</Link>
                        </li>
                        : null
                    }
                </ul>
            </div>
            <div className="top-bar-right">
                <img onClick={checkAuth} className="avatar" src={showProfile()} alt="avatar" />
                <i className="search-icon fas fa-search"></i>
            </div>
        </div>
    )
}

export default TopBar;
