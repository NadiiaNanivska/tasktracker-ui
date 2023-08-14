import React, {useEffect} from 'react';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../styles/Login.css';
import {Button, Input, Form, message} from 'antd';
import {passwordValidator, emailValidator} from "../utils/validation";
import {loginRequest} from "../utils/userRequests";

const Login = () => {
    const history = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values;
        const requestBody = {
            email: email,
            password: password
        };

        await loginRequest(requestBody, history);
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
