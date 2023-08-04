import React, {useState} from 'react';
import '../styles/Register.css';
import {Button, Input, Form, message} from 'antd';
import {firstNameValidator, lastNameValidator, passwordValidator, emailValidator, phoneValidator} from '../utils/validation';
import {useNavigate} from "react-router-dom";

const Register = () => {

    const history = useNavigate();
    const [token, setToken] = useState('');

    const onFinish = (values) => {
        const { firstname, lastname, email, password, repeatPassword, phone } = values;
        const requestBody = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            phone: phone,
            role: "USER"
        };

        fetch("http://localhost:8080/api/v1/auth/register", {
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
        <div className="register">
            <div className="register-block">
                <div className="register-head">
                    <Form className="register-form" onFinish={onFinish}>
                    <div className="register-head-wrapper">
                        <div className="register-head-name">TaskTracker</div>
                        <div className="register-head-text">Register</div>
                    </div>
                    <Form.Item
                        name="firstname"
                        rules={[
                            { required: true, message: 'Please enter your first name' },
                            { ...firstNameValidator },
                        ]}
                        className="register-input"
                    >
                        <Input size="large" placeholder="First Name*" />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
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
                        name="repeat-password"
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