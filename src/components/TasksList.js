import React, { useContext, useState, useEffect } from 'react';
import SidebarContext from '../contexts/SidebarContext';
import '../styles/TasksList.css';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Task from "./Task";
import AddTask from './AddTask';
import axios from "axios";
import { deleteTask, fetchTasks, fetchTasksWithoutName, updateTask } from "../utils/tasksRequests";
import { SearchContext } from "../contexts/SearchContext";

const TasksList = ({ name, afterdragtasks, updateTasks, isDarkMode }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const { searchText } = useContext(SearchContext);


    useEffect(() => {
        setTasks(afterdragtasks);
    }, [afterdragtasks]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    useEffect(() => {
        
        fetchTasks(name, setTasks);
    }, [isNewTaskAdded]);

    const onDeleteTask = (id) => {
        setTaskIdToDelete(id);
        showDeleteModal();
    }

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setIsDeleteModalVisible(false);
        fetchTasks(name, setTasks);
    };

    const filterTasksByTitle = (tasks, searchText) => {
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const filteredTasks = filterTasksByTitle(tasks, searchText);

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrop = async (e) => {
        const taskId = parseInt(e.dataTransfer.getData("taskId"), 10);
        const allTasks = await fetchTasksWithoutName();

        const draggedTask = allTasks.find((task) => task.id === taskId);
        const previousStatus = draggedTask.status;

        const updatedTask = { ...draggedTask, status: name };
        await updateTask(taskId, updatedTask);

        const taskExists = tasks.some((task) => task.id === draggedTask.id);

        if (!taskExists) {
            const updatedTasks = [...tasks, draggedTask];
            setTasks(updatedTasks);
            updateTasks(previousStatus, allTasks.filter((task) => task.id !== updatedTask.id && task.status === previousStatus));
        }
    };


    return (
        <div className={`list-card ${isDarkMode ? 'dark' : ''}`} onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <div className="card-content">
                <p className="card-heading">{name}</p>
                <Button type="default" className={`card-add-btn ${isDarkMode ? 'dark' : ''}`} icon={<PlusOutlined />} onClick={showModal}
                    block></Button>
                {filteredTasks.map((task) => (
                    <Task
                        title={task.title}
                        description={task.description}
                        key={task.id}
                        taskId={task.id}
                        onDeleteTask={() => onDeleteTask(task.id)}
                        name={name}
                        isDarkMode={isDarkMode}
                    />
                ))}
                <AddTask setIsNewTaskAdded={setIsNewTaskAdded} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} name={name}></AddTask>
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