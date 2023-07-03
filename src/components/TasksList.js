import React, { useContext } from 'react';
import SidebarContext from '../SidebarContext';
import '../styles/TasksList.css';
import { Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const TasksList = ({name}) => {
    return (
        <div className="list-card">
            <div className="card-content">
            <p className="card-heading">{name}</p>
            <Button type="default" className="card-add-btn" icon={<PlusOutlined />} block></Button>
            </div>
        </div>
    );
}

export default TasksList;