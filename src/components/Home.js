import React, {useContext, useState} from "react";
import '../styles/Home.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TasksList from "./TasksList";
import SidebarContext from "../SidebarContext";

const Home = () => {
    const [sidebarWidth, setSidebarWidth] = useState(18);
    const navbarWidth = `calc(100% - ${sidebarWidth}em)`;
    const updateSidebarWidth = (newWidth) => {
      setSidebarWidth(newWidth);
    };

  return (
    <SidebarContext.Provider value={sidebarWidth}>
      <div className="home">
      <Navbar />
      <Sidebar updateSidebarWidth={updateSidebarWidth} />
      <div className="content" style={{width: navbarWidth , paddingLeft: `${sidebarWidth + 1}em`}}>
          <TasksList name={"To do"}/>
          <TasksList name={"In progress"}/>
          <TasksList name={"Done"}/>
      </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Home;