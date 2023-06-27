import 'C:/Users/User/Desktop/TaskTracker/tasktracker-ui/src/Sidebar.css';

import React from 'react';
import HomeIcon from './home.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
              <img src={HomeIcon} alt="Home" className="sidebar-icon" />
            </div>
            <span className="sidebar-text">Tasks</span>
          </a>
        </li>
        <li className="sidebar-item">
        <a href="#" className="sidebar-link">
            <div className="icon-wrapper">
              <img src={HomeIcon} alt="Home" className="sidebar-icon" />
            </div>
            <span className="sidebar-text">Calendar</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
