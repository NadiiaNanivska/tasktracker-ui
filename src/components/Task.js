import React, { useState } from 'react';
import '../styles/Task.css';
import DeleteIcon from "../images/delete.svg";
import { Modal, Input, Button, Popconfirm } from 'antd';
import { updateTask } from '../utils/tasksRequests';

const Task = ({ title: initialTitle, description: initialDescription, name, onDeleteTask, taskId, isDarkMode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const updatedTask = { title: title, description: description, status: name };
      await updateTask(taskId, updatedTask);
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error");
    }
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
      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
    title="Cancel changes"
    description="Are you sure to cancel changes?"
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
        <div>
          <label>Title:</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <label>Description:</label>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
          />
        </div>
      </Modal>
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
