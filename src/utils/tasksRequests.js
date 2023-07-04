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