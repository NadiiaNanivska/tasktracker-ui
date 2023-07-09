import React, {useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import "../styles/HomePage.css";
import HomePageIcon from "../images/home-page.jpg";
import mailIcon from "../images/email.svg";
import facebookIcon from "../images/facebook.svg";
import instagramIcon from "../images/instagram.svg";
import telegramIcon from "../images/telegram.svg";
import {Button} from "antd";


const HomePage = () => {
    const [sidebarWidth, setSidebarWidth] = useState(18);
    const contentWidth = `calc(67.5vh - ${sidebarWidth}em)`;
    const contentRef = useRef(null);

    const updateSidebarWidth = (newWidth) => {
        setSidebarWidth(newWidth);
    };

    const updateContentWidth = () => {
        if(sidebarWidth === 18) {
            contentRef.current.style.marginLeft = `${contentWidth}`;
        } else {
            contentRef.current.style.marginLeft = `${contentWidth}`;
        }
    }

    return (
        <div className="home-page">
            <Sidebar updateSidebarWidth={updateSidebarWidth} updateContentWidth={updateContentWidth}/>
            <div className="home-page-content" ref={contentRef}>
                <div className="home-page-left">
                    <div className="home-page-left-head">
                        TaskTracker
                    </div>
                    <div className="home-page-left-middle">
                        TASK MANAGEMENT
                    </div>
                    <div className="home-page-left-end">
                        Make a business plan or list of resolutions to achieve goals or achieve success.
                    </div>
                    <div className="home-page-about">
                        <p>Contact us:</p>
                        <div className="social-media-icons">
                            <a href="mailto:vitok2misze@gmail.com">
                                <img src={mailIcon} alt="Email" className="icon" />
                                <span>Email</span>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100015042850556">
                                <img src={facebookIcon} alt="Facebook" className="icon" />
                                <span>Facebook</span>
                            </a>
                            <a href="https://www.instagram.com/vitalikyatskiv/">
                                <img src={instagramIcon} alt="Instagram" className="icon" />
                                <span>Instagram</span>
                            </a>
                            <a href="https://web.telegram.org/k/#@V_love_N">
                                <img src={telegramIcon} alt="Telegram" className="icon" />
                                <span>Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-page-right">
                    <img src={HomePageIcon} className="home-page-icon"/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;