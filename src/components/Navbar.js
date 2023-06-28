import React, {useRef, useState} from "react";
import '../styles/Navbar.css';
import Search from "./Search";
import DogItem from '../images/dog.png';
import NotificationsItem from '../images/notifications.svg';
import FaqItem from "../images/faq.svg";

const Navbar = () => {
    return (
        <div className="navbar">
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