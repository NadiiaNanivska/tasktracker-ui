import React, { useContext, useState, useEffect } from 'react';
import SidebarContext from '../contexts/SidebarContext';
import '../styles/TasksList.css';
import {Button, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Task from "./Task";
import AddTask from './AddTask';
import axios from "axios";
import {deleteTask} from "../utils/tasksRequests";
import {SearchContext} from "../contexts/SearchContext";

const TasksList = ({name}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const { searchText } = useContext(SearchContext);

    const toggleTasksList = () => {
        fetchTasks();
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    useEffect(() => {
        fetchTasks();
    }, [isNewTaskAdded]);

    const fetchTasks = async () => {
        try {
            const url = `http://localhost:8080/tasks?status=${name}`;
            const response = await axios.get(url);
            const data = response.data;
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const onDeleteTask = (id) => {
        setTaskIdToDelete(id);
        showDeleteModal();
    }

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setIsDeleteModalVisible(false);
        fetchTasks();
    };

    const filterTasksByTitle = (tasks, searchText) => {
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const filteredTasks = filterTasksByTitle(tasks, searchText);

    return (
        <div className="list-card">
            <div className="card-content">
            <p className="card-heading">{name}</p>
            <Button type="default" className="card-add-btn" icon={<PlusOutlined />} onClick={showModal}
            block></Button>
                {filteredTasks.map((task) => (
                    <Task
                        title={task.title}
                        description={task.description}
                        key={task.id}
                        onDeleteTask={() => onDeleteTask(task.id)}
                        name={name}
                    />
                ))}
            <AddTask isNewTaskAdded={toggleTasksList} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} name={name}></AddTask>
                <Modal
                    title="Delete confirmation"
                    visible={isDeleteModalVisible}
                    onOk={() => handleDeleteTask(taskIdToDelete)}
                    onCancel={() => setIsDeleteModalVisible(false)}
                >
                    <p>Are you sure you want to delete the task?</p>
                </Modal>
            </div>
        </div>
    );
}

export default TasksList;