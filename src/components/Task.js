import React, { useContext } from 'react';
import '../styles/Task.css';
import AttachIcon from "../images/attach.svg";
import { useDrag, useDrop } from 'react-dnd';

const Task = () => {
    return (
        <div className="task">
            <div className="task-name">
                <div>
                <span className="dot"></span>
                <span className="sidebar-text">Development</span>
                </div>
                <div className="icon-wrapper">
                    <img src={AttachIcon} alt="Name" className="sidebar-icon" />
                </div>
            </div>
            <div className="task-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia eros ac consequat semper.
            </div>
            <div className="assigned-users">
                <div className="user-avatar">YV</div>
            </div>
        </div>
    );
}

export default Task;