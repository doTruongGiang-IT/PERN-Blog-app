import React, {useState, useEffect} from 'react';
import './SideBar.css';
import avatar from '../../assets/avatar.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';

const SideBar = ({history}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            const res = await axios(`http://localhost:5000/api/category`);
            setCategories(res.data);
        };
        getCategories();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <h2 className="sidebar-title">ABOUT ME</h2>
                <img src={avatar} alt=""/>
                <p>
                Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebar-item">
                <h2 className="sidebar-title">CATEGORIES</h2>
                <ul className="sidebar-list">
                    {
                        categories.map((category, index) => {
                            return <li key={index} className="sidebar-list-item">
                                        <Link to={`?cat=${category.name}`} className="link">{category.name}</Link>
                                    </li>
                        })
                    }
                </ul>
            </div>
            <div className="sidebar-item">
                <h2 className="sidebar-title">FOLLOW US</h2>
                <div className="sidebar-social">
                    <i className="sidebar-icon fab fa-facebook-square"></i>
                    <i className="sidebar-icon fab fa-instagram-square"></i>
                    <i className="sidebar-icon fab fa-pinterest-square"></i>
                    <i className="sidebar-icon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar;
