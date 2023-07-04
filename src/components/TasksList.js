import React, { useContext, useState, useEffect } from 'react';
import SidebarContext from '../SidebarContext';
import '../styles/TasksList.css';
import { Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Task from "./Task";
import AddTask from './AddTask';

const TasksList = ({name}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const url = `http://localhost:8080/tasks?status=${name}`;
            const response = await fetch(url);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div className="list-card">
            <div className="card-content">
            <p className="card-heading">{name}</p>
            <Button type="default" className="card-add-btn" icon={<PlusOutlined />} onClick={showModal}
            block></Button>
            {tasks.map((task) => (
                <Task title={task.title} description={task.description} key={task.id} name={name}/>
            ))}
            <AddTask isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} name={name}></AddTask>
            </div>
        </div>
    );
}

export default TasksList;