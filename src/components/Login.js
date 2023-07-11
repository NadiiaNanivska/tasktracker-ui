import React, { useContext, useState, useEffect } from 'react';
import '../styles/Login.css';
import {Button, Input, Checkbox, Form} from 'antd';
import {passwordValidator, emailValidator} from "../utils/validation";

const Login = () => {
    const onFinish = (values) => {
        console.log('Form values:', values);
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
