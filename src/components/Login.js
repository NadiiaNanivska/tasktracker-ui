import React, { useContext, useState, useEffect } from 'react';
import '../styles/Login.css';
import {Button, Input, Checkbox} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
const Login = () => {
    return (
        <div className="login">
            <div className="login-block">
                <div className="login-head">
                    <div className="login-head-wrapper">
                        <div className="login-head-name">TaskTracker</div>
                        <div className="login-head-text">Login</div>
                    </div>
                    <div className="login-credentials-wrapper">
                        <Input size="large" className="login-input" placeholder="Enter email" />
                        <Input size="large" className="login-input" placeholder="Enter password" />
                    </div>
                    <div className="login-remember-wrapper">
                        <Checkbox />
                        <span>Remember me</span>
                    </div>
                    <div className="login-button-wrapper">
                    <Button type="primary" className="card-add-btn">
                        LOGIN
                    </Button>
                    </div>
                    <a href="/register" className="login-without-account">
                        Don`t have an account? Sign Up!
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