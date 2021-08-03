import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import SideBar from '../../components/SideBar/SideBar';
import './HomePage.css';
import { useLocation } from 'react-router-dom';

const HomePage = ({history}) => {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    useEffect(() => {
        const getPosts = async() => {
            const res = await axios.get("http://localhost:5000/api/posts" + search);
            setPosts(res.data);
        };
        getPosts();
    }, [posts, search]);
    
    return (
        <>
            <Header />
            <div className="homepage">
                <Posts posts={posts} />
                <SideBar history={history} />
            </div>
        </>
    )
}

export default HomePage;
