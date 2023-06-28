import React, {useRef, useState} from "react";
import '../styles/Home.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
        </div>
    );
};

export default Home;