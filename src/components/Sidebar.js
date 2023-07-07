import '../styles/Sidebar.css';
import React, {useRef, useState, useEffect} from 'react';
import HomeIcon from '../images/home.svg';
import TaskIcon from '../images/tasks1.svg';
import CalendarIcon from '../images/calendar.svg';
import SettingsIcon from '../images/settings.svg';
import LogoutIcon from '../images/log-out.svg';
import MenuItem from '../images/burger-menu.svg';
import Navbar from './Navbar';
import SidebarContext from '../contexts/SidebarContext';

const Sidebar = ({updateSidebarWidth}) => {
    const sidebarHeadingRef = useRef(null);
    const sidebarTextRef = useRef([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const hideMenu = () => {
        if (sidebarHeadingRef.current.style.display !== 'none') {
            updateSidebarWidth(5);
            sidebarHeadingRef.current.style.display = 'none';
            sidebarTextRef.current.forEach((ref) => {
                if (ref.style.display !== 'none') {
                    ref.style.display = 'none';
                }
            });
        } else {
            sidebarHeadingRef.current.style.display = 'flex';
            updateSidebarWidth(18);
            sidebarTextRef.current.forEach((ref) => {
                    ref.style.display = 'flex';
            });
        }
    }

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header" >
                <div className="sidebar-heading-wrapper">
            <div onClick={() => {hideMenu(); toggleSidebar();}} className="icon-wrapper">
                <img src={MenuItem} alt="Home" className="sidebar-icon-heading" />
            </div>
            <span className="sidebar-heading" ref={sidebarHeadingRef}>TaskTracker</span>
                </div>
            <ul className={`sidebar-nav ${isSidebarOpen ? 'open-text' : 'closed-text'}`}>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className="icon-wrapper">
                            <img src={HomeIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[0] = el)}>Home</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="/tasks" className="sidebar-link">
                        <div className="icon-wrapper">
                            <img src={TaskIcon} alt="Home" className="sidebar-icon" />
                        </div>
                        <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[1] = el)}>Tasks</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
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
                        <a href="#" className="sidebar-link">
                            <div className="icon-wrapper">
                                <img src={SettingsIcon} alt="Home" className="sidebar-icon" />
                            </div>
                            <span className="sidebar-text" ref={(el) => (sidebarTextRef.current[3] = el)}>Settings</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="/login" className="sidebar-link">
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
