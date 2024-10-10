import React from 'react';
import RightPanel from './RightPanel';
import './Dashboard.css';
import Sidebar from '../sidebar/Sidebar';
import MainContent from './MainContent';

const Dashboard: React.FC = () => {
    return (
        <div className="container">
            <Sidebar/>
            {/* Main Content */}
            <main className="content">
                <MainContent/>
            </main>
            <RightPanel/>
        </div>
    );
};

export default Dashboard;
