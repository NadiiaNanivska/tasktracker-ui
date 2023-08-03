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

        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(url, { headers });
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const fetchTasksWithoutName = async () => {
    try {
        const url = `http://localhost:8080/tasks`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`http://localhost:8080/tasks/${taskId}`, updatedTask);
        console.log('Task updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};