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
import DarkModeItem from "../images/dark-mode.svg";


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
                <div className={`settings-header ${isDarkMode ? 'dark' : ''}`}>
                    Account Settings
                </div>
                <div className="settings-fields">
                    <Form className="settings-form">
                        <div className="settings-form-parts">
                        <div className="settings-form-part">
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>First name</span>
                        <Form.Item
                            name="first-name"
                            rules={[
                                { required: true, message: 'Please enter your first name' },
                                { ...firstNameValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="First Name*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Last name</span>
                        <Form.Item
                            name="last-name"
                            rules={[
                                { required: true, message: 'Please enter your last name' },
                                { ...lastNameValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Last Name*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Email</span>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { ...emailValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`}  placeholder="Email*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Country</span>
                        <Form.Item
                            name="country"
                            rules={[
                                { required: true, message: 'Please enter your country' },
                                { ...countryValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Country" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Company</span>
                        <Form.Item
                            name="company"
                            rules={[
                                { required: true, message: 'Please enter your company' },
                                { ...companyValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Company" />
                        </Form.Item>
                        </div>
                        <div className="settings-form-part">
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Password</span>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter your password' },
                                { ...passwordValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Password*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Repeat Password</span>
                        <Form.Item
                            name="repeat-password"
                            rules={[
                                { required: true, message: 'Please repeat your password' },
                                { ...passwordValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Repeat password*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Phone number</span>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: 'Please enter your phone number' },
                                { ...phoneValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Phone Number" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>City</span>
                        <Form.Item
                            name="city"
                            rules={[
                                { required: true, message: 'Please enter your city' },
                                { ...cityValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="City" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Address</span>
                            <Form.Item
                                name="address"
                                rules={[
                                    { required: true, message: 'Please enter your address' },
                                    { ...addressValidator },
                                ]}
                            >
                                <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Address" />
                            </Form.Item>
                        </div>
                        </div>
                        <div className="settings-button-wrapper">
                            <Button type="primary" htmlType="submit" className={`card-add-btn settings-btn ${isDarkMode ? 'dark' : ''}`}>
                                Save changes
                            </Button>
                            <Button type="primary" htmlType="reset" className={`card-add-btn settings-btn ${isDarkMode ? 'dark' : ''}`}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <img src={DarkModeItem} onClick={() => setIsDarkMode(prevState => !prevState)}
                 alt="dark-mode" className="home-page-icon-mode" />
        </div>
    );
};

export default Settings;