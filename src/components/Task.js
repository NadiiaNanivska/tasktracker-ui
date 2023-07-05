import React, { useContext } from 'react';
import '../styles/Task.css';
import DeleteIcon from "../images/delete.svg";

const Task = ({title, description, name, onDeleteTask}) => {

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
                <span className="title-text">{title}</span>
                </div>
                <div className="icon-wrapper">
                    <img src={DeleteIcon} className="title-icon" onClick={onDeleteTask}/>
                </div>
            </div>
            <div className="task-content">
               {description}
            </div>
        </div>
    );
}

export default Task;