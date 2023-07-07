import React, {useRef, useState, useContext} from "react";
import '../styles/Navbar.css';
import Search from "./Search";
import DogItem from '../images/dog.png';
import NotificationsItem from '../images/notifications.svg';
import FaqItem from "../images/faq.svg";
import SidebarContext from "../contexts/SidebarContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const sidebarWidth = useContext(SidebarContext);
    const navbarWidth = `calc(100% - ${sidebarWidth}em)`;

    const handleMouseClick = () => {
        setShowMenu(prevState => !prevState);
    };

    return (
        <div className="navbar" style={{ width: navbarWidth}}>
            <Search/>
            <div className="initials">
                <img className="navbar-notification-img" src={FaqItem} />
                <img className="navbar-notification-img" src={NotificationsItem} />
                <h4>Vitalik Yatskiv</h4>
                <div className="navbar-person-div" onClick={handleMouseClick}>
                <img className="navbar-person-img" src={DogItem} alt="person-img"/>
                {showMenu && <UserMenu />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;