import React, { useState } from 'react';
import '../styles/TasksList.css';
import { Form, Modal, Input, Button, Popconfirm, theme, ConfigProvider } from 'antd';
import { addTask } from '../utils/tasksRequests';

const AddTask = ({ isModalVisible, setIsModalVisible, name, setIsNewTaskAdded, isDarkMode }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    setIsNewTaskAdded(false);

    const handleOk = () => {
        form.validateFields().then((data) => {
            form.resetFields();
            addTask(title, description, name);
            setIsNewTaskAdded(true);
            setIsModalVisible(false);
        })
            .catch((err) => {
                console.log('err', err);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (<ConfigProvider
        theme={{
          token: {
            colorPrimary: 'forestgreen',
            colorBgContainer: isDarkMode ? '#444' : '#fff',
            colorText: isDarkMode ? '#cccccc' : 'black',
          },
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Modal
            title="Add Task"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Popconfirm
                    title="Cancel changes"
                    description="Are you sure you want to cancel changes?"
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
                    Save
                </Button>,
            ]}
        >
            <Form form={form}>
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
                            { min: 10, message: 'The description should be at least 10 characters long' },
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

    </ConfigProvider>
    );
}

export default AddTask;