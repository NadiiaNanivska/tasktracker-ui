import React, { useState } from 'react';
import '../styles/TasksList.css';
import { Form, Modal, Input, Button, Popconfirm } from 'antd';
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
        console.log(title)
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
        >
            <Form>
            <div>
                <label>Title</label>
                <Form.Item
                    name="title"
                    rules={[
                        { required: true, message: 'Please enter the task title' },
                    ]}
                    style={{ marginBottom: 0 }}
                >
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                </Form.Item>
            </div>
            <div>
                <label>Description:</label>
                <Form.Item
                    name="description"
                    rules={[
                        { required: true, message: 'Please enter the task description' },
                        { min: 40, message: 'The description should be at least 40 characters long' },
                        { max: 400, message: 'The description should not exceed 400 characters' },
                    ]}
                >
                <Input.TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
                </Form.Item>
            </div>
            </Form>
        </Modal>
    </>
    );
}

export default AddTask;