import React, {useRef, useState, useContext} from "react";
import '../styles/Navbar.css';
import Search from "./Search";
import DogItem from '../images/dog.png';
import NotificationsItem from '../images/notifications.svg';
import FaqItem from "../images/faq.svg";
import SidebarContext from "../SidebarContext";

const Navbar = () => {
    const sidebarWidth = useContext(SidebarContext);
    const navbarWidth = `calc(100% - ${sidebarWidth}em)`;
    return (
        <div className="navbar" style={{ width: navbarWidth}}>
            <Search/>
            <div className="initials">
                <img className="navbar-notification-img" src={FaqItem} />
                <img className="navbar-notification-img" src={NotificationsItem} />
                <h4>Vitalik Yatskiv</h4>
                <img className="navbar-person-img" src={DogItem} />
            </div>
        </div>
    );
};

export default Navbar;