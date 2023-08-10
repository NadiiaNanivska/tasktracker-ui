import React from 'react';
import "../styles/UserMenu.css"
import "../styles/Sidebar.css"
import LogoutIcon from "../images/log-out.svg";
import {useNavigate} from "react-router-dom";

const UserMenu = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/login");
    };

    return (
        <div className="user-menu">
            <a onClick={handleLogout} className="user-menu-link">
                <div className="user-menu-icon-wrapper">
                    <img src={LogoutIcon} alt="Home" className="user-menu-icon" />
                </div>
                <span className="user-menu-text">Log out</span>
            </a>
        </div>
    );
};

export default UserMenu;
