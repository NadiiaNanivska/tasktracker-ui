import React, { useState } from 'react';
import '../styles/TasksList.css';
import { Modal, Input, Button, Popconfirm } from 'antd';
import { addTask } from '../utils/tasksRequests';

const AddTask = ({ isModalVisible, setIsModalVisible, name, setIsNewTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleOk = () => {
        addTask(title, description, name);
        setIsNewTaskAdded(true);
        setIsModalVisible(false);
        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsNewTaskAdded(false);
        setTitle('');
        setDescription('');
    };

    return (<>
        <Modal
            title="Add Task"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Popconfirm
                    title="Are you sure to cancel changes?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleCancel}
                >
                    <Button key="cancel">
                        Cancel
                    </Button>
                </Popconfirm>
                ,
                <Button key="save" type="primary" onClick={handleOk}>
                    Add
                </Button>,
            ]}
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