import React from 'react';
import PostDetails from '../../components/PostDetails/PostDetails';
import SideBar from '../../components/SideBar/SideBar';
import './DetailsPage.css';

const DetailsPage = ({history}) => {
    return (
        <div className="details-page">
            <PostDetails history={history} />
            <SideBar />
        </div>
    )
}

export default DetailsPage;
