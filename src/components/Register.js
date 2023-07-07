import React, { useContext, useState, useEffect } from 'react';
import '../styles/Register.css';
import {Button, Input, Checkbox} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
const Register = () => {
    return (
        <div className="register">
            <div className="register-block">
                <div className="register-head">
                    <div className="register-head-wrapper">
                        <div className="register-head-name">TaskTracker</div>
                        <div className="register-head-text">Register</div>
                    </div>
                    <div className="register-credentials-wrapper">
                        <Input size="large" className="register-input" placeholder="First Name*" />
                        <Input size="large" className="register-input" placeholder="Last Name*" />
                        <Input size="large" className="register-input" placeholder="Email*" />
                        <Input size="large" className="register-input" placeholder="Password*" />
                        <Input size="large" className="register-input" placeholder="Repeat password*" />
                        <Input size="large" className="register-input" placeholder="Phone Number" />
                    </div>
                    <div className="register-button-wrapper">
                        <Button type="primary" className="card-add-btn register-btn">
                            SIGN UP
                        </Button>
                    </div>
                    <a href="/login" className="register-without-account">
                        Already have an account? Log In!
                    </a>
                    <div className="register-copyright">
                        &copy; TaskTracker 2023. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;