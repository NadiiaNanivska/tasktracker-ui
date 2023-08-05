import axios from "axios";
import {message} from "antd";

export const loginRequest = async (requestBody, history) => {
    axios.post('http://localhost:8080/api/v1/auth/authenticate', requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.data) {
                message.error('You passed incorrect credentials!');
            } else {
                const token = response.data.token;
                const userId = response.data.userId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                history('/tasks');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const registrationRequest = async (requestBody, history) => {
    axios.post('http://localhost:8080/api/v1/auth/register', requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.data) {
                message.error('You passed incorrect credentials!');
            } else {
                const token = response.data.token;
                const userId = response.data.userId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                history('/tasks');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const getUserRequest = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const updateUserData = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user data');
    }
};