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
                localStorage.setItem('token', token);

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
                localStorage.setItem('token', token);

                history('/tasks');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}