import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import CustomCalendar from "./Calendar";
import SidebarContext from "../contexts/SidebarContext";

const CalendarPage = () => {
    const contextData = useContext(SidebarContext);
    const [sidebarWidth, setSidebarWidth] = useState(contextData);
    const navbarWidth = `calc(100% - ${sidebarWidth}em - 1.5em)`;
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

    const updateSidebarWidth = (newWidth) => {
        setSidebarWidth(newWidth);
    };
    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    return (<>
        <Sidebar isDarkMode={isDarkMode} updateSidebarWidth={updateSidebarWidth} updateContentWidth={() => { }} />
        <div style={{ width: navbarWidth, paddingLeft: `${sidebarWidth + 1}em` }}>
            <CustomCalendar></CustomCalendar>
        </div>
    </>)
}

export default CalendarPage;