import React, {useState, useContext, useEffect} from "react";
import '../styles/Navbar.css';
import Search from "./Search";
import DogItem from '../images/dog.png';
import NotificationsItem from '../images/notifications.svg';
import DarkModeItem from "../images/dark-mode.svg";
import SidebarContext from "../contexts/SidebarContext";
import UserMenu from "./UserMenu";
import {getUserRequest} from "../utils/userRequests";

const Navbar = ({toggleDark, isDarkMode}) => {
    const [showMenu, setShowMenu] = useState(false);
    const sidebarWidth = useContext(SidebarContext);
    const navbarWidth = `calc(100% - ${sidebarWidth}em)`;
    const [userData, setUserData] = useState({});

    const handleMouseClick = () => {
        setShowMenu(prevState => !prevState);
    };

    useEffect( () => {
        const fetchUserData = async () => {
            const userData = await getUserRequest();
            if (userData) {
                setUserData(userData);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="navbar" style={{ width: navbarWidth}}>
            <Search isDarkMode={isDarkMode}/>
            <div className={`initials ${isDarkMode ? 'dark' : ''}`}>
                <img className="navbar-notification-img" src={DarkModeItem} onClick={toggleDark} />
                <img className="navbar-notification-img" src={NotificationsItem} />
                <h4 className={`navbar-name ${isDarkMode ? 'dark' : ''}`}>{userData.firstname} {userData.lastname}</h4>
                <div className="navbar-person-div" onClick={handleMouseClick}>
                <img className="navbar-person-img" src={DogItem} alt="person-img"/>
                {showMenu && <UserMenu />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;