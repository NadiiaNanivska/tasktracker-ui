import React, {useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import {Button, Form, Input} from "antd";
import {
    addressValidator,
    cityValidator, companyValidator, countryValidator,
    emailValidator,
    firstNameValidator,
    lastNameValidator,
    passwordValidator,
    phoneValidator
} from "../utils/validation";


const Settings = () => {
    const [sidebarWidth, setSidebarWidth] = useState(18);
    const contentWidth = `calc(67.5vh - ${sidebarWidth}em)`;
    const contentRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const updateSidebarWidth = (newWidth) => {
        setSidebarWidth(newWidth);
    };

    const updateContentWidth = () => {
        if(sidebarWidth === 18) {
            contentRef.current.style.marginLeft = `${contentWidth}`;
        } else {
            contentRef.current.style.marginLeft = `${contentWidth}`;
        }
    }

    return (
        <div className={`settings ${isDarkMode ? 'dark' : ''}`}>
            <Sidebar isDarkMode={isDarkMode} updateSidebarWidth={updateSidebarWidth} updateContentWidth={updateContentWidth}/>
            <div className="settings-content" ref={contentRef}>
                <div className="settings-header">
                    Account Settings
                </div>
                <div className="settings-fields">
                    <Form className="settings-form">
                        <div className="settings-form-parts">
                        <div className="settings-form-part">
                            <span className="settings-input-text">First name</span>
                        <Form.Item
                            name="first-name"
                            rules={[
                                { required: true, message: 'Please enter your first name' },
                                { ...firstNameValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="First Name*" />
                        </Form.Item>
                            <span className="settings-input-text">Last name</span>
                        <Form.Item
                            name="last-name"
                            rules={[
                                { required: true, message: 'Please enter your last name' },
                                { ...lastNameValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Last Name*" />
                        </Form.Item>
                            <span className="settings-input-text">Email</span>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { ...emailValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Email*" />
                        </Form.Item>
                            <span className="settings-input-text">Country</span>
                        <Form.Item
                            name="country"
                            rules={[
                                { required: true, message: 'Please enter your country' },
                                { ...countryValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Country" />
                        </Form.Item>
                            <span className="settings-input-text">Company</span>
                        <Form.Item
                            name="company"
                            rules={[
                                { required: true, message: 'Please enter your company' },
                                { ...companyValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Company" />
                        </Form.Item>
                        </div>
                        <div className="settings-form-part">
                            <span className="settings-input-text">Password</span>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter your password' },
                                { ...passwordValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Password*" />
                        </Form.Item>
                            <span className="settings-input-text">Repeat Password</span>
                        <Form.Item
                            name="repeat-password"
                            rules={[
                                { required: true, message: 'Please repeat your password' },
                                { ...passwordValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Repeat password*" />
                        </Form.Item>
                            <span className="settings-input-text">Phone number</span>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: 'Please enter your phone number' },
                                { ...phoneValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="Phone Number" />
                        </Form.Item>
                            <span className="settings-input-text">City</span>
                        <Form.Item
                            name="city"
                            rules={[
                                { required: true, message: 'Please enter your city' },
                                { ...cityValidator },
                            ]}
                            className="settings-input"
                        >
                            <Input size="large" placeholder="City" />
                        </Form.Item>
                            <span className="settings-input-text">Address</span>
                            <Form.Item
                                name="address"
                                rules={[
                                    { required: true, message: 'Please enter your address' },
                                    { ...addressValidator },
                                ]}
                                className="settings-input"
                            >
                                <Input size="large" placeholder="Address" />
                            </Form.Item>
                        </div>
                        </div>
                        <div className="settings-button-wrapper">
                            <Button type="primary" htmlType="submit" className="card-add-btn settings-btn">
                                Save changes
                            </Button>
                            <Button type="primary" htmlType="reset" className="card-add-btn settings-btn">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Settings;