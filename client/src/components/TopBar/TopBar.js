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

    let openSidebarMobile = () => {
        var sidebar = document.querySelector(".sidebar-mobile");
        if (sidebar.style.display === "" || sidebar.style.display === "none") sidebar.style.display = "block";
    };

    let closeSidebarMobile = () => {
        var sidebar = document.querySelector(".sidebar-mobile");
        if (sidebar.style.display === "block") sidebar.style.display = "none";
    };

    return (
        <>
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
            <div className="top-bar-mobile">
                <i onClick={openSidebarMobile} className="top-icon fas fa-bars"></i>
            </div>
        </div>

        
        <div className="sidebar-mobile w3-container w3-center w3-animate-right">
            <h2 onClick={closeSidebarMobile} className="close-sidebar">X</h2>
            <ul className="top-list-mobile">
                <li className="top-list-item-mobile">
                    <Link className="link-mobile" to="/">HOME</Link>
                </li>
                <li className="top-list-item-mobile">
                    <Link className="link-mobile" to="/">ABOUT</Link>
                </li>
                <li className="top-list-item-mobile">
                    <Link className="link-mobile" to="/">CONTACT</Link>
                </li>
                <li className="top-list-item-mobile">
                    <Link className="link-mobile" to="/create">WRITE</Link>
                </li>
                {
                    localStorage.getItem("pern_blog_auth") ?
                    <li className="top-list-item-mobile">
                        <Link className="link-mobile" to="/setting">SETTING</Link>
                    </li>
                    : null
                }
                <li className="top-list-item-mobile">
                    <img onClick={checkAuth} className="avatar" src={showProfile()} alt="avatar" />
                </li>
            </ul>
        </div>
        </>
    )
}

export default TopBar;
