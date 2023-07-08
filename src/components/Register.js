import React, { useContext, useState, useEffect } from 'react';
import '../styles/Register.css';
import {Button, Input, Form} from 'antd';
import {createValidator} from '../utils/validation';


const Register = () => {

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const firstNamePattern = /^[A-Z][a-zA-Z]*$/;
    const firstNameMessage = 'Please enter a valid first name';
    const firstNameValidator = createValidator(firstNamePattern, firstNameMessage);

    const lastNamePattern = /^[A-Z][a-zA-Z]*$/;
    const lastNameMessage = 'Please enter a valid last name';
    const lastNameValidator = createValidator(lastNamePattern, lastNameMessage);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailMessage = 'Please enter a valid email';
    const emailValidator = createValidator(emailPattern, emailMessage);

    const passwordPattern = /^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const passwordMessage = 'Please enter a valid password';
    const passwordValidator = createValidator(passwordPattern, passwordMessage);

    const phonePattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const phoneMessage = 'Please enter a valid phone number in the format +XXX (XXX) XXX-XXXX';
    const phoneValidator = createValidator(phonePattern, phoneMessage);


    return (
        <div className="register">
            <div className="register-block">
                <div className="register-head">
                    <Form className="register-form" onFinish={onFinish}>
                    <div className="register-head-wrapper">
                        <div className="register-head-name">TaskTracker</div>
                        <div className="register-head-text">Register</div>
                    </div>
                    <Form.Item
                        name="first-name"
                        rules={[
                            { required: true, message: 'Please enter your first name' },
                            { ...firstNameValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="First Name*" />
                    </Form.Item>
                    <Form.Item
                        name="last-name"
                        rules={[
                            { required: true, message: 'Please enter your last name' },
                            { ...lastNameValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="Last Name*" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { ...emailValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="Email*" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password' },
                            { ...passwordValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="Password*" />
                    </Form.Item>
                    <Form.Item
                        name="repeatPassword"
                        rules={[
                            { required: true, message: 'Please repeat your password' },
                            { ...passwordValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="Repeat password*" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: 'Please enter your phone number' },
                            { ...phoneValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="Phone Number" />
                    </Form.Item>
                    <div className="register-button-wrapper">
                        <Button type="primary" htmlType="submit" className="card-add-btn register-btn">
                            SIGN UP
                        </Button>
                    </div>
                    </Form>
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