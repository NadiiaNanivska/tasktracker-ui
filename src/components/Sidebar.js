import '../styles/Sidebar.css';
import React from 'react';
import HomeIcon from '../images/home.svg';
import TaskIcon from '../images/tasks1.svg';
import CalendarIcon from '../images/calendar.svg';
import SettingsIcon from '../images/settings.svg';
import LogoutIcon from '../images/log-out.svg';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
            <h1 className="sidebar-heading">TaskTracker</h1>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className="icon-wrapper">
                            <img src={HomeIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text">Home</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className="icon-wrapper">
                            <img src={TaskIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text">Tasks</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className="icon-wrapper">
                            <img src={CalendarIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text">Calendar</span>
                    </a>
                </li>
            </ul>
            </div>
            <div className="sidebar-footer">
                <ul className="sidebar-nav-footer">
                    <li className="sidebar-item-footer">
                        <a href="#" className="sidebar-link">
                            <div className="icon-wrapper">
                                <img src={SettingsIcon} alt="Home" className="sidebar-icon" />
                            </div>
                            <span className="sidebar-text">Settings</span>
                        </a>
                    </li>
                    <li className="sidebar-item-footer">
                        <a href="#" className="sidebar-link">
                            <div className="icon-wrapper">
                                <img src={LogoutIcon} alt="Home" className="sidebar-icon" />
                            </div>
                            <span className="sidebar-text">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
