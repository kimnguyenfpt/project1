// my-app/src/components/profile/Profile.tsx

import React from 'react';
import './Profile.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import ProfileInfo from './ProfileInfo';

const Profile: React.FC = () => {
    return (
        <div className="container">
            <Sidebar/>
            {/* Main Content */}
            <main className="content">
                    <Header pageTitle="Thông tin cá nhân" />
                <ProfileInfo/>     
            </main>
        </div>
    );
};

export default Profile;