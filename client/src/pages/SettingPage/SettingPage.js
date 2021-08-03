import React,{useState, useEffect} from 'react';
import './SettingPage.css';
import fakeAuth from '../../assets/giang.png'
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';

const SettingPage = ({history}) => {
    if(!localStorage.getItem("pern_blog_auth")) history.push("/register");
    let user = JSON.parse(localStorage.getItem("pern_blog_auth"));
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(false);
    const image = "http://localhost:5000/images/";

    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
        // if(user.profile !== "") setPhoto(user.profile);
    }, [user.username, user.email, user.profile]);

    let updateProfile = async (username, email, password, photo) => {
        if(photo) {
            const data = new FormData();
            const fileName = Date.now() + photo.name;
            data.append("name", fileName);
            data.append("file", photo);
            await axios.post("http://localhost:5000/api/upload", data);
            if(password) {
                const res = await axios.put(`http://localhost:5000/api/user/${user.id}`,{id: user.id, username, email, password, profile: fileName});
                res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
                res.data && setUpdateStatus(true);
            }else {
                const res = await axios.put(`http://localhost:5000/api/user/${user.id}`,{id: user.id, username, email, profile: fileName});
                res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
                res.data && setUpdateStatus(true);
            };
        }else {
            if(password) {
                const res = await axios.put(`http://localhost:5000/api/user/${user.id}`,{id: user.id, username, email, password});
                res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
                res.data && setUpdateStatus(true);
            }else {
                const res = await axios.put(`http://localhost:5000/api/user/${user.id}`,{id: user.id, username, email});
                res.data && localStorage.setItem("pern_blog_auth", JSON.stringify(res.data));
                res.data && setUpdateStatus(true);
            };
        };
    };

    let deleteAccount = async () => {
        const res = await axios.delete(`http://localhost:5000/api/user/${user.id}`);
        res && window.location.replace("/");
        localStorage.removeItem("pern_blog_auth");
    };

    return (
        <div className="setting-page">
            <div className="setting-page-wrapper">
                <div className="setting-page-title">
                    <span className="setting-page-title-update">Update Your Account</span>
                    <span className="setting-page-title-delete" onClick={deleteAccount}>Delete Account</span>
                </div>
                <form className="setting-page-form">
                    <label>Profile Picture</label>
                    <div className="setting-page-PP">
                        {/* {
                            photo ? 
                            <img src={image+photo} alt="" />
                            :
                            <img
                                src={fakeAuth}
                                alt=""
                            />
                        } */}
                        <img src={photo !== null ? URL.createObjectURL(photo) : (user.profile ? image+user.profile : fakeAuth)} alt="" />
                        <label htmlFor="file-input">
                        <i className="setting-page-PP-icon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            style={{ display: "none" }}
                            className="setting-page-PP-input"
                            onChange={e => setPhoto(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={() => updateProfile(username, email, password, photo)} className="setting-page-submit" type="button">Update</button>
                    {
                        updateStatus && <p className="status">Update account success...</p>
                    }
                </form>
            </div>
            <SideBar />
        </div>
    )
}

export default SettingPage;
