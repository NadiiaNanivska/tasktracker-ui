import axios from 'axios';

export const addTask = async (title, description, name) => {
    try {
        await axios.post('http://localhost:8080/tasks', {
            title: title,
            description: description,
            status: name,
        });
    } catch (error) {
        console.log('error', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:8080/tasks/${taskId}`);
    } catch (error) {
        console.log('error', error);
    }
};

export const fetchTasks = async (name, setTasks) => {
    try {
      const url = `http://localhost:8080/tasks?status=${name}`;
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };