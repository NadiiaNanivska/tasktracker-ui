import React, { useContext, useState, useEffect } from "react";
import '../styles/Home.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TasksList from "./TasksList";
import SidebarContext from "../contexts/SidebarContext";
import { SearchProvider } from "../contexts/SearchContext";
import { fetchTasksWithoutName } from "../utils/tasksRequests";

const Home = () => {
  const contextData = useContext(SidebarContext);
  const [sidebarWidth, setSidebarWidth] = useState(contextData);
  const navbarWidth = `calc(100% - ${sidebarWidth}em)`;
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);


  const updateSidebarWidth = (newWidth) => {
    setSidebarWidth(newWidth);
  };

  const [tasks, setTasks] = useState({
    'To do': [],
    'In progress': [],
    'Done': []
  });

  useEffect(() => {
    const fetchAllTasks = async () => {
      const allTasks = await fetchTasksWithoutName();
      const updatedTasks = {
        'To do': [],
        'In progress': [],
        'Done': []
      };
      allTasks.forEach((task) => {
        updatedTasks[task.status].push(task);
      });
      setTasks(updatedTasks);
    };

    fetchAllTasks();
  }, []);


  const [shouldUpdate, setShouldUpdate] = useState(false);

  const updateTasks = (status, updatedTasks) => {
    console.log(updatedTasks)
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: updatedTasks
    }));
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false);
    }
    console.log(tasks)
  }, [shouldUpdate]);

  return (
    <SearchProvider>
      <SidebarContext.Provider value={sidebarWidth}>
        <div className={`home ${isDarkMode ? 'dark' : ''}`}>
          <Navbar sidebarWidth={sidebarWidth} isDarkMode={isDarkMode} toggleDark={() => setIsDarkMode(prevState => !prevState)} />
          <Sidebar isDarkMode={isDarkMode} updateSidebarWidth={updateSidebarWidth}/>
          <div className="content" style={{ width: navbarWidth, paddingLeft: `${sidebarWidth + 1}em` }}>
            <TasksList name="To do" afterdragtasks={tasks['To do']} updateTasks={updateTasks} isDarkMode={isDarkMode} />
            <TasksList name="In progress" afterdragtasks={tasks['In progress']} updateTasks={updateTasks} isDarkMode={isDarkMode} />
            <TasksList name="Done" afterdragtasks={tasks['Done']} updateTasks={updateTasks} isDarkMode={isDarkMode} />
          </div>
        </div>
        </SidebarContext.Provider>
    </SearchProvider>
  );
};

export default Home;
