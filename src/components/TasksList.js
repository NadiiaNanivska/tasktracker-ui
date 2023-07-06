import React, { useContext, useState, useEffect } from 'react';
import SidebarContext from '../contexts/SidebarContext';
import '../styles/TasksList.css';
import {Button, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Task from "./Task";
import AddTask from './AddTask';
import axios from "axios";
import {deleteTask, fetchTasks, fetchTasksWithoutName, updateTask} from "../utils/tasksRequests";
import {SearchContext} from "../contexts/SearchContext";

const TasksList = ({name}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [tasksAll, setAllTasks] = useState([]);
    const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const { searchText } = useContext(SearchContext);

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
        setAllTasks(allTasks);

        const draggedTask = allTasks.find((task) => task.id === taskId);
        const previousStatus = draggedTask.status;
        // console.log(taskId);
        console.log(draggedTask);
        console.log(previousStatus);

        const updatedTask = { title: draggedTask.title, description: draggedTask.description, status: name };
        await updateTask(taskId, updatedTask);
         // Видалити перетягувану задачу зі списку allTasks
         const updatedAllTasks = allTasks.filter((task) => task.id !== taskId);

         // Додати перетягувану задачу до списку updatedTasks
         const updatedTasks = [...tasks, draggedTask];
 
        //  setAllTasks(updatedAllTasks);
         setTasks(updatedTasks);
        
    };


    return (
        <div className="list-card" onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <div className="card-content">
            <p className="card-heading">{name}</p>
            <Button type="default" className="card-add-btn" icon={<PlusOutlined />} onClick={showModal}
            block></Button>
                {filteredTasks.map((task) => (
                    <Task
                        title={task.title}
                        description={task.description}
                        key={task.id}
                        taskId={task.id}
                        onDeleteTask={() => onDeleteTask(task.id)}
                        name={name}
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