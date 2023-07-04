import React, { useContext } from 'react';
import '../styles/Task.css';
import AttachIcon from "../images/attach.svg";
// import { useDrag, useDrop } from 'react-dnd';

const Task = ({title, description, name}) => {

    const getDotColorClass = (name) => {
        switch (name) {
          case 'To do':
            return 'dot-red';
          case 'In progress':
            return 'dot-blue';
          case 'Done':
            return 'dot-green';
          default:
            return '';
        }
      };

      const dotColorClass = getDotColorClass(name);

    return (
        <div className="task">
            <div className="task-name">
                <div>
                <span className={`dot ${dotColorClass}`}></span>
                <span className="sidebar-text">{title}</span>
                </div>
            </div>
            <div className="task-content">
               {description}
            </div>
        </div>
    );
}

export default Task;