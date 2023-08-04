import '../styles/Sidebar.css';
import React, {useRef, useState, useEffect} from 'react';
import HomeIcon from '../images/home.svg';
import TaskIcon from '../images/tasks1.svg';
import CalendarIcon from '../images/calendar.svg';
import SettingsIcon from '../images/settings.svg';
import LogoutIcon from '../images/log-out.svg';
import MenuItem from '../images/burger-menu.svg';
import {useLocation, useNavigate} from "react-router-dom";

const Sidebar = ({updateSidebarWidth, isDarkMode}) => {
    const sidebarHeadingRef = useRef(null);
    const sidebarTextRef = useRef([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/tasks')){
            setActiveTab('tasks');
        }  else if(path.includes('/calendar')) {
            setActiveTab('calendar')
        } else if(path.includes('/settings')){
            setActiveTab('settings')
        } else if(path.includes('/')) {
            setActiveTab('home')
        }
    }, [location]);


    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const hideElements = (isHidden) => {
        const displayValue = isHidden ? 'none' : 'flex';
        sidebarHeadingRef.current.style.display = displayValue;
        sidebarTextRef.current.forEach((ref) => {
          ref.style.display = displayValue;
        });
      };

      const hideMenu = () => {
        if (isSidebarOpen) {
          updateSidebarWidth(5);
          hideElements(true);
        } else {
          updateSidebarWidth(18);
          hideElements(false);
        }
      };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/login");
    };
    
      useEffect(() => {
        hideElements(true);
      }, []);
      
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header" >
                <div className="sidebar-heading-wrapper">
            <div onClick={() => {hideMenu(); toggleSidebar();}} className="icon-wrapper">
                <img src={MenuItem} alt="Home" className="sidebar-icon-heading" />
            </div>
            <span className={`sidebar-heading ${isDarkMode ? 'dark' : ''}`} ref={sidebarHeadingRef}>TaskTracker</span>
                </div>
            <ul className={`sidebar-nav ${isSidebarOpen ? 'open-text' : 'closed-text'}`}>
                <li className="sidebar-item">
                    <a href="/" className={`sidebar-link ${isDarkMode ? 'dark' : ''} ${activeTab === 'home' ? 'active' : ''} `}>
                        <div className="icon-wrapper">
                            <img src={HomeIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[0] = el)}>Home</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="/tasks" className={`sidebar-link ${isDarkMode ? 'dark' : ''} ${activeTab === 'tasks' ? 'active' : ''}`}>
                        <div className="icon-wrapper">
                            <img src={TaskIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[1] = el)}>Tasks</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="/calendar" className={`sidebar-link ${isDarkMode ? 'dark' : ''} ${activeTab === 'calendar' ? 'active' : ''}`}>
                        <div className="icon-wrapper">
                            <img src={CalendarIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[2] = el)}>Calendar</span>
                    </a>
                </li>
            </ul>
            </div>
            <div className="sidebar-footer">
                <ul className={`sidebar-nav ${isSidebarOpen ? 'open-text' : 'closed-text'}`}>
                    <li className="sidebar-item">
                        <a href="/settings" className={`sidebar-link ${isDarkMode ? 'dark' : ''} ${activeTab === 'settings' ? 'active' : ''}`}>
                            <div className="icon-wrapper">
                                <img src={SettingsIcon} alt="Home" className="sidebar-icon" />
                            </div>
                            <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[3] = el)}>Settings</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a onClick={handleLogout} className={`sidebar-link ${isDarkMode ? 'dark' : ''}`}>
                            <div className="icon-wrapper">
                                <img src={LogoutIcon} alt="Home" className="sidebar-icon" />
                            </div>
                            <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[4] = el)}>Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
