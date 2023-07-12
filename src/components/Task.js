import React, { useState } from 'react';
import '../styles/Task.css';
import DeleteIcon from "../images/delete.svg";
import { Modal, Input, Button, Popconfirm, Form, ConfigProvider, theme } from 'antd';
import { updateTask } from '../utils/tasksRequests';

const Task = ({ title: initialTitle, description: initialDescription, name, onDeleteTask, taskId, isDarkMode }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    form.validateFields().then((data) => {
      form.resetFields();
      try {
        const updatedTask = { title: data.title, description: data.description, status: name };
        updateTask(taskId, updatedTask);
        setTitle(data.title);
        setDescription(data.description);
        setIsModalVisible(false);
      } catch (error) {
        console.log("Error");
      }
    })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteTask();
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id)
  }

  return (
    <div className={`task ${isDarkMode ? 'dark' : ''}`} draggable={true} onDragStart={(e) => onDragStart(e, taskId)}>
      <div className="task-name" onClick={showModal}>
        <div>
          <span className={`dot ${getDotColorClass(name)}`}></span>
          <span className="title-text" title="Edit task">{title}</span>
        </div>
        <div className="icon-wrapper">
          <img src={DeleteIcon} className="title-icon" onClick={onDeleteClick} />
        </div>
      </div>
      <div className="task-content">
        {description}
      </div>
      <ConfigProvider
        theme={{
         algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
      <Modal
        title="Edit Task"
        visible={isModalVisible}
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
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form}>
          <div>
            <label>Title:</label>
            <Form.Item
              initialValue={title}
              name="title"
              rules={[
                { required: true, message: 'Please enter the task title' },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input
                value={title}
                placeholder="Title"
              />
            </Form.Item>
          </div>
          <div>
            <label>Description:</label>
            <Form.Item
              initialValue={description}
              name="description"
              rules={[
                { required: true, message: 'Please enter the task description' },
                { min: 10, message: 'The description should be at least 10 characters long' },
                { max: 400, message: 'The description should not exceed 400 characters' },
              ]}
            >
              <Input.TextArea
                value={description}
                placeholder="Description"
                rows={4}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      </ConfigProvider>
    </div>
  );
};

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

export default Task;
