import axios from 'axios';

export const addTask = async (title, description, name) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        await axios.post('http://localhost:8080/tasks', {
            title: title,
            description: description,
            status: name,
        }, { headers });
    } catch (error) {
        console.log('error', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        await axios.delete(`http://localhost:8080/tasks/${taskId}`, { headers });
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

        const tasks = response.data.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt
        }));
        setTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const fetchTasksWithoutName = async () => {
    try {
        const url = `http://localhost:8080/tasks`;
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(url, { headers });

        return response.data.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt
        }));
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.put(`http://localhost:8080/tasks/${taskId}`, updatedTask, {headers});
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};