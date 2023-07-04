import React, {useState} from 'react';
import '../styles/TasksList.css';
import {Modal, Input } from 'antd';
import {addTask } from '../utils/tasksRequests';

const AddTask = ({isModalVisible, setIsModalVisible, name}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');    

    const handleOk = () => {
        addTask(title, description, name);
        setIsModalVisible(false);
        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTitle('');
        setDescription('');
    };

    return (<>
        <Modal
            title="Add Task"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <label>Title:</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
            </div>
            <div>
                <label>Description:</label>
                <Input.TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </div>
        </Modal></>);
}

export default AddTask;