import React  from 'react';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../styles/Login.css';
import {Button, Input, Form, message} from 'antd';
import {passwordValidator, emailValidator} from "../utils/validation";

const Login = () => {

    const history = useNavigate();
    const [token, setToken] = useState('');

    const onFinish = (values) => {
        const { email, password } = values;
        const requestBody = {
            email: email,
            password: password
        };

        fetch("http://localhost:8080/api/v1/auth/authenticate", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    message.error("You passed incorrect credentials!")
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                const token = data.token;
                localStorage.setItem('token', token);
                setToken(token);

                history("/tasks");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="login">
            <div className="login-block">
                <div className="login-head">
                    <Form className="login-form" onFinish={onFinish}>
                        <div className="login-head-wrapper">
                            <div className="login-head-name">TaskTracker</div>
                            <div className="login-head-text">Login</div>
                        </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { ...emailValidator },
                                ]}
                                className="login-input"
                            >
                                <Input size="large"  placeholder="Enter email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please enter your password' },
                                    { validator: passwordValidator },
                                ]}
                                className="login-input"
                            >
                                <Input size="large"  placeholder="Enter password" />
                            </Form.Item>
                        <div className="login-button-wrapper">
                            <Button type="primary" htmlType="submit" className="card-add-btn login-btn">
                                LOGIN
                            </Button>
                        </div>
                    </Form>
                    <a href="/register" className="login-without-account">
                        Don't have an account? Sign Up!
                    </a>
                    <div className="login-copyright">
                        &copy; TaskTracker 2023. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
